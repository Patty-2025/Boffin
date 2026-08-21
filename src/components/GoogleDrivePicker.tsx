import React, { useState } from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import driveLogo from '../assets/trusted-logos/google-drive.svg';

type DriveItem = {
  id: string;
  name: string;
  mimeType: string;
  url: string;
};

type GoogleDrivePickerProps = {
  onSelect: (items: DriveItem[]) => void;
};

type GoogleApi = {
  load: (library: string, callback: () => void) => void;
};

type GooglePicker = {
  PickerBuilder: new () => {
    addView: (view: unknown) => GooglePicker['PickerBuilder'];
    setOAuthToken: (token: string) => GooglePicker['PickerBuilder'];
    setDeveloperKey: (key: string) => GooglePicker['PickerBuilder'];
    setCallback: (callback: (data: { action: string; docs?: Array<{ id: string; name: string; mimeType: string; url: string }> }) => void) => GooglePicker['PickerBuilder'];
    enableFeature: (feature: string) => GooglePicker['PickerBuilder'];
    build: () => { setVisible: (visible: boolean) => void };
  };
  View: new (viewId: string) => { setMimeTypes: (mimeTypes: string) => void };
  ViewId: { DOCS: string };
  DocsView: new (viewId?: string) => { setIncludeFolders: (include: boolean) => void; setSelectFolderEnabled: (enabled: boolean) => void };
  Response: { ACTION: string; DOCUMENTS: string };
  Feature: { MULTISELECT_ENABLED: string };
};

type GoogleIdentity = {
  accounts: {
    oauth2: {
      initTokenClient: (config: { client_id: string; scope: string; callback: (response: { access_token?: string; error?: string }) => void }) => { requestAccessToken: () => void };
    };
  };
};

declare global {
  interface Window {
    gapi?: GoogleApi;
    google?: { picker?: GooglePicker; accounts?: GoogleIdentity['accounts'] };
  }
}

const loadScript = (src: string, id: string) => new Promise<void>((resolve, reject) => {
  const existing = document.getElementById(id);
  if (existing) {
    resolve();
    return;
  }
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  script.onload = () => resolve();
  script.onerror = () => reject(new Error('Google Drive could not be loaded.'));
  document.body.appendChild(script);
});

export default function GoogleDrivePicker({ onSelect }: GoogleDrivePickerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const openPicker = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
    const clientId = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;
    if (!apiKey || !clientId) {
      setError('Google Drive selection is not configured yet. Add VITE_GOOGLE_DRIVE_API_KEY and VITE_GOOGLE_DRIVE_CLIENT_ID to the environment.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await Promise.all([
        loadScript('https://apis.google.com/js/api.js', 'google-api-script'),
        loadScript('https://accounts.google.com/gsi/client', 'google-identity-script')
      ]);
      await new Promise<void>((resolve) => window.gapi?.load('picker', resolve));

      const tokenClient = window.google?.accounts?.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (response) => {
          if (response.error || !response.access_token || !window.google?.picker) {
            setError('Google Drive authorization was not completed.');
            setIsLoading(false);
            return;
          }
          const docsView = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS);
          docsView.setIncludeFolders(false);
          docsView.setSelectFolderEnabled(false);
          const picker = new window.google.picker.PickerBuilder()
            .addView(docsView)
            .setOAuthToken(response.access_token)
            .setDeveloperKey(apiKey)
            .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
            .setCallback((data) => {
              if (data.action === 'picked' && data.docs) {
                onSelect(data.docs.map((doc) => ({ id: doc.id, name: doc.name, mimeType: doc.mimeType, url: doc.url })));
              }
              setIsLoading(false);
            })
            .build();
          picker.setVisible(true);
        }
      });
      tokenClient?.requestAccessToken();
    } catch (pickerError) {
      setError(pickerError instanceof Error ? pickerError.message : 'Google Drive could not be opened.');
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button type="button" onClick={(event) => { event.stopPropagation(); void openPicker(); }} disabled={isLoading} className="inline-flex items-center gap-1 font-bold text-[#4285f4] hover:underline disabled:cursor-wait disabled:opacity-60">
        {isLoading ? <LoaderCircle size={16} className="animate-spin" /> : <img src={driveLogo} alt="" aria-hidden="true" className="h-4 w-5 object-contain" />}
        Google Drive
      </button>
      {error && <span role="alert" className="flex max-w-[310px] items-start gap-1 text-left text-[11px] font-medium text-red-600"><AlertCircle size={13} className="mt-0.5 shrink-0" />{error}</span>}
    </div>
  );
}
