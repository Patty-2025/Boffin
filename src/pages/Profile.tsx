import React, { useState, useEffect } from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import PortalPageHeader from '../components/PortalPageHeader';
import { 
  Briefcase, FlaskConical, Wrench, Calculator, Scale, 
  HeartPulse, Monitor, Hash, Book, Layout, CircleDollarSign, Magnet, Dna, 
  Stethoscope, Globe, Brain, Scroll, Users, LineChart, BarChart, MoreHorizontal, X
} from 'lucide-react';

interface UserProfile {
  name: string;
  avatar: string;
  residence: string;
  country: string;
  university: string;
  course: string;
  studyYearsLeft: number;
  yearStarted: number | '';
  currentYear: number | '';
  yearEnding: number | '';
  phoneCode: string;
  phone: string;
  altPhoneCode: string;
  altPhone: string;
  whatsappOptIn: boolean;
}

const COURSES = [
  { name: 'Management', icon: Briefcase, color: '#eef2f6' },
  { name: 'Chemistry', icon: FlaskConical, color: '#eef2f6' },
  { name: 'Engineering', icon: Wrench, color: '#fcf3eb' },
  { name: 'Commerce', icon: Calculator, color: '#eef2f6' },
  { name: 'Law', icon: Scale, color: '#f5f7f5' },
  { name: 'Medical', icon: HeartPulse, color: '#fcf0f0' },
  { name: 'Computer', icon: Monitor, color: '#fbf5eb' },
  { name: 'Mathematics', icon: Hash, color: '#f5f7f5' },
  { name: 'English', icon: Book, color: '#fcf3eb' },
  { name: 'Web design', icon: Layout, color: '#eef2f6' },
  { name: 'Finance', icon: CircleDollarSign, color: '#f5f7f5' },
  { name: 'Physics', icon: Magnet, color: '#f5f7f5' },
  { name: 'Biology', icon: Dna, color: '#eef2f6' },
  { name: 'Nursing', icon: Stethoscope, color: '#f5f7f5' },
  { name: 'Geography', icon: Globe, color: '#eef2f6' },
  { name: 'Psychology', icon: Brain, color: '#f5f7f5' },
  { name: 'History', icon: Scroll, color: '#fcf3eb' },
  { name: 'Sociology', icon: Users, color: '#f5f7f5' },
  { name: 'Economics', icon: LineChart, color: '#fcf3eb' },
  { name: 'Statistics', icon: BarChart, color: '#eef2f6' },
  { name: 'Other', icon: MoreHorizontal, color: '#eef2f6' },
];

const AVATAR_SEEDS = [
  'Felix', 'Aneka', 'Peanut', 'George', 'Jasper', 'Milo', 'Sam', 'Jack', 'Jocelyn', 'Bella', 'Boo'
];

const COMMON_UNIS = [
  "Harvard University", "Stanford University", "Massachusetts Institute of Technology (MIT)",
  "University of Cambridge", "University of Oxford", "California Institute of Technology (Caltech)",
  "Princeton University", "Yale University", "Imperial College London", "University of Chicago",
  "UCL (University College London)", "University of Pennsylvania", "Johns Hopkins University",
  "Columbia University", "ETH Zurich", "University of California, Berkeley",
  "University of Edinburgh", "University of Toronto", "National University of Singapore (NUS)",
  "Cornell University", "New York University (NYU)", "University of Michigan",
  "University of Melbourne", "Peking University", "Tsinghua University",
  "University of Washington", "University of Texas at Austin", "Duke University",
  "University of California, Los Angeles (UCLA)", "University of Sydney",
  "University of New South Wales (UNSW)", "University of Queensland", "University of British Columbia",
  "King's College London", "London School of Economics (LSE)", "University of Manchester",
  "University of Nairobi", "Kenyatta University", "Strathmore University", "Jomo Kenyatta University",
  "Monash University", "University of Western Australia", "Australian National University"
];

const ALL_COUNTRIES = [
  { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" }, { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" }, { name: "Bahamas", code: "+1-242" }, { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" }, { name: "Barbados", code: "+1-246" }, { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" }, { name: "Belize", code: "+501" }, { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" }, { name: "Bosnia", code: "+387" },
  { name: "Botswana", code: "+267" }, { name: "Brazil", code: "+55" }, { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" }, { name: "Burundi", code: "+257" }, { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" }, { name: "Canada", code: "+1" }, { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" }, { name: "China", code: "+86" }, { name: "Colombia", code: "+57" },
  { name: "Comoros", code: "+269" }, { name: "Congo", code: "+242" }, { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" }, { name: "Cuba", code: "+53" }, { name: "Cyprus", code: "+357" },
  { name: "Czechia", code: "+420" }, { name: "Denmark", code: "+45" }, { name: "Djibouti", code: "+253" },
  { name: "Dominican Rep", code: "+1-809" }, { name: "Ecuador", code: "+593" }, { name: "Egypt", code: "+20" },
  { name: "El Salvador", code: "+503" }, { name: "Equatorial Guinea", code: "+240" }, { name: "Estonia", code: "+372" },
  { name: "Ethiopia", code: "+251" }, { name: "Fiji", code: "+679" }, { name: "Finland", code: "+358" },
  { name: "France", code: "+33" }, { name: "Gabon", code: "+241" }, { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" }, { name: "Germany", code: "+49" }, { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" }, { name: "Guatemala", code: "+502" }, { name: "Guinea", code: "+224" },
  { name: "Haiti", code: "+509" }, { name: "Honduras", code: "+504" }, { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" }, { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" }, { name: "Jamaica", code: "+1-876" },
  { name: "Japan", code: "+81" }, { name: "Jordan", code: "+962" }, { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" }, { name: "Kuwait", code: "+965" }, { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" }, { name: "Latvia", code: "+371" }, { name: "Lebanon", code: "+961" },
  { name: "Lesotho", code: "+266" }, { name: "Liberia", code: "+231" }, { name: "Libya", code: "+218" },
  { name: "Liechtenstein", code: "+423" }, { name: "Lithuania", code: "+370" }, { name: "Luxembourg", code: "+352" },
  { name: "Madagascar", code: "+261" }, { name: "Malawi", code: "+265" }, { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" }, { name: "Mali", code: "+223" }, { name: "Malta", code: "+356" },
  { name: "Mauritania", code: "+222" }, { name: "Mauritius", code: "+230" }, { name: "Mexico", code: "+52" },
  { name: "Moldova", code: "+373" }, { name: "Monaco", code: "+377" }, { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" }, { name: "Morocco", code: "+212" }, { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" }, { name: "Namibia", code: "+264" }, { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" }, { name: "Nigeria", code: "+234" }, { name: "North Korea", code: "+850" },
  { name: "North Macedonia", code: "+389" }, { name: "Norway", code: "+47" }, { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" }, { name: "Palestine", code: "+970" }, { name: "Panama", code: "+507" },
  { name: "Papua New Guinea", code: "+675" }, { name: "Paraguay", code: "+595" }, { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" }, { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" }, { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" }, { name: "Saudi Arabia", code: "+966" }, { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" }, { name: "Seychelles", code: "+248" }, { name: "Sierra Leone", code: "+232" },
  { name: "Singapore", code: "+65" }, { name: "Slovakia", code: "+421" }, { name: "Slovenia", code: "+386" },
  { name: "Somalia", code: "+252" }, { name: "South Africa", code: "+27" }, { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" }, { name: "Sudan", code: "+249" },
  { name: "Suriname", code: "+597" }, { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" }, { name: "Taiwan", code: "+886" }, { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" }, { name: "Thailand", code: "+66" }, { name: "Togo", code: "+228" },
  { name: "Tunisia", code: "+216" }, { name: "Turkey", code: "+90" }, { name: "Turkmenistan", code: "+993" },
  { name: "Uganda", code: "+256" }, { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" }, { name: "United States", code: "+1" }, { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" }, { name: "Vatican", code: "+379" }, { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" }, { name: "Yemen", code: "+967" }, { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" }
];

export default function Profile() {
  const { user } = useAuth();
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    avatar: 'Felix',
    residence: '',
    country: '',
    university: '',
    course: '',
    studyYearsLeft: 0,
    yearStarted: '',
    currentYear: '',
    yearEnding: '',
    phoneCode: 'Kenya',
    phone: '',
    altPhoneCode: 'Australia',
    altPhone: '',
    whatsappOptIn: false,
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uniSuggestions, setUniSuggestions] = useState<string[]>([]);
  const [showUniSuggestions, setShowUniSuggestions] = useState(false);
  const [isFetchingUnis, setIsFetchingUnis] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const matchingCountries = ALL_COUNTRIES.filter((country) => country.name.toLowerCase().includes(countrySearch.trim().toLowerCase())).slice(0, 10);

  const selectCountry = (country: { name: string; code: string }) => {
    setProfile((current) => ({ ...current, country: country.name, phoneCode: country.code }));
    setCountrySearch(country.name);
    setShowCountrySuggestions(false);
  };
  const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);
  const courseSuggestions = COURSES.map(course => course.name).filter(course => course.toLowerCase().includes(profile.course.toLowerCase())).slice(0, 8);
  const avatarImage = profile.avatar.startsWith('data:') ? profile.avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}&backgroundColor=eef1f5`;

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setProfile(current => ({ ...current, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // University Autocomplete hook
  useEffect(() => {
    const fetchUnis = async () => {
      if (!profile.university || profile.university.length < 2) {
        setUniSuggestions([]);
        setIsFetchingUnis(false);
        return;
      }
      
      setIsFetchingUnis(true);
      try {
        const res = await fetch(`https://universities.hipolabs.com/search?name=${encodeURIComponent(profile.university)}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        
        let uniqueNames = Array.from(new Set(data.map((u: any) => u.name))).slice(0, 8) as string[];
        
        // If API returns zero results, fallback to local filtering manually
        if (uniqueNames.length === 0) {
           uniqueNames = COMMON_UNIS.filter(u => u.toLowerCase().includes(profile.university.toLowerCase())).slice(0, 8);
        }

        if (uniqueNames.length === 1 && uniqueNames[0] === profile.university) {
          setUniSuggestions([]);
        } else {
          setUniSuggestions(uniqueNames);
        }
      } catch (err) {
        // Fallback to local list if API fails entirely (CORS rules, Adblockers, Offline Mode)
        const fallback = COMMON_UNIS.filter(u => u.toLowerCase().includes(profile.university.toLowerCase())).slice(0, 8);
        
        if (fallback.length === 1 && fallback[0] === profile.university) {
          setUniSuggestions([]);
        } else {
          setUniSuggestions(fallback);
        }
      } finally {
        setIsFetchingUnis(false);
      }
    };

    const debounce = setTimeout(fetchUnis, 500);
    return () => clearTimeout(debounce);
  }, [profile.university]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(false);
      try {
        const docRef = doc(db, 'studentProfiles', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const savedProfile = docSnap.data();
          const savedCountry = ALL_COUNTRIES.find((country) => country.name.toLowerCase() === String(savedProfile.country || '').toLowerCase());
          setProfile(prev => ({ ...prev, ...savedProfile, phoneCode: savedCountry?.code || savedProfile.phoneCode || '' }));
          setCountrySearch(savedProfile.country || '');
        } else {
          setProfile(prev => ({ ...prev, name: user.displayName || '' }));
        }
      } catch (err: any) {
        if (err?.message?.includes('client is offline')) {
          console.log('Using local/default profile (Firestore is in offline mode).');
        } else {
          console.error('Error fetching profile:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    // Validate required fields
    if (!profile.residence || !profile.country || !profile.university || !profile.phoneCode || !profile.phone) {
      setSaveMessage('Please complete the required fields before updating your profile.');
      return;
    }
    
    setSaving(true);
    setSaveMessage('');
    try {
      const docRef = doc(db, 'studentProfiles', user.uid);
      const profileToSave = { ...profile, userId: user.uid, email: user.email || '', emailVerified: user.emailVerified, updatedAt: serverTimestamp() };
      await Promise.race([
        setDoc(docRef, profileToSave, { merge: true }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Profile update timed out.')), 10000))
      ]);
      setProfile(current => ({ ...current, ...profileToSave }));
      setSaveMessage('Profile updated successfully.');
    } catch (err) {
      setSaveMessage('Unable to update your profile. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto mt-2 min-w-0 w-full max-w-7xl animate-in fade-in duration-500 pb-8 font-['Open_Sans',sans-serif]">
      <PortalPageHeader title="My profile" description="Keep your client details up to date for smoother orders and support." />

      <div className="min-w-0 border border-slate-200 bg-white px-5 py-6 lg:px-8">
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900">Personal (Contact) and Educational background</h2>
          <div className="grid min-w-0 gap-4 md:grid-cols-4">
            <Field label="Your name"><input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>
            <Field label="Present residence" required={!profile.residence}><input value={profile.residence} onChange={e => setProfile({...profile, residence: e.target.value})} placeholder="Enter your city" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>
            <div className="relative"><Field label="Country of origin" required={!profile.country}><input value={countrySearch} onFocus={() => setShowCountrySuggestions(true)} onChange={e => { setCountrySearch(e.target.value); setProfile(current => ({ ...current, country: e.target.value, phoneCode: '' })); setShowCountrySuggestions(true); }} onBlur={() => setTimeout(() => setShowCountrySuggestions(false), 150)} placeholder="Search country" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>{showCountrySuggestions && countrySearch && matchingCountries.length > 0 && <div className="absolute left-0 right-0 top-full z-20 max-h-56 overflow-y-auto border border-slate-200 bg-white shadow-lg">{matchingCountries.map(country => <button type="button" key={country.name} onMouseDown={() => selectCountry(country)} className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm hover:bg-slate-50">{country.name} <span className="text-slate-500">{country.code}</span></button>)}</div>}</div>
            <div className="flex min-w-0 flex-col items-center gap-2 self-start border border-slate-200 bg-slate-50 px-3 py-2 text-center md:col-span-1 md:row-span-2">
              <img src={avatarImage} alt="Selected avatar" className="h-12 w-12 object-cover" />
              <div className="min-w-0"><p className="text-sm font-semibold text-slate-700">Profile photo</p><p className="text-xs text-slate-500">Upload or choose an avatar.</p></div>
              <button type="button" onClick={() => setIsAvatarPickerOpen(true)} className="shrink-0 border border-[#0080d1] px-3 py-2 text-xs font-bold text-[#0080d1] hover:bg-sky-50">Upload or choose</button>
            </div>
            <section className="md:col-span-3">
              <div className="grid min-w-0 gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2"><Field label="University" required={!profile.university}><input value={profile.university} onFocus={() => setShowUniSuggestions(true)} onChange={e => { setProfile({...profile, university: e.target.value}); setShowUniSuggestions(true); }} onBlur={() => setTimeout(() => setShowUniSuggestions(false), 150)} placeholder="Type a university name" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>{showUniSuggestions && profile.university.length >= 2 && <div className="absolute left-0 right-0 top-full z-20 max-h-56 overflow-y-auto border border-slate-200 bg-white shadow-lg">{isFetchingUnis ? <p className="px-3 py-3 text-sm text-slate-500">Searching global universities...</p> : uniSuggestions.map(uni => <button type="button" key={uni} onMouseDown={() => { setProfile({...profile, university: uni}); setShowUniSuggestions(false); }} className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm hover:bg-slate-50">{uni}</button>)}</div>}</div>
            <div className="relative"><Field label="Course enrolled"><input value={profile.course} onFocus={() => setShowCourseSuggestions(true)} onChange={e => { setProfile({...profile, course: e.target.value}); setShowCourseSuggestions(true); }} onBlur={() => setTimeout(() => setShowCourseSuggestions(false), 150)} placeholder="Type your course" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>{showCourseSuggestions && profile.course && courseSuggestions.length > 0 && <div className="absolute left-0 right-0 top-full z-20 border border-slate-200 bg-white shadow-lg">{courseSuggestions.map(course => <button type="button" key={course} onMouseDown={() => { setProfile({...profile, course}); setShowCourseSuggestions(false); }} className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm hover:bg-slate-50">{course}</button>)}</div>}</div>
            <Field label="Year started"><input type="number" value={profile.yearStarted} onChange={e => setProfile({...profile, yearStarted: e.target.value ? Number(e.target.value) : ''})} placeholder="YYYY" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>
            <Field label="Current year"><input type="number" value={profile.currentYear} onChange={e => setProfile({...profile, currentYear: e.target.value ? Number(e.target.value) : ''})} placeholder="YYYY" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>
            <Field label="Year ending"><input type="number" value={profile.yearEnding} onChange={e => setProfile({...profile, yearEnding: e.target.value ? Number(e.target.value) : ''})} placeholder="YYYY" className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></Field>
              </div>
            </section>
          </div>
        </section>

        <section>
          <div className="grid min-w-0 gap-4 md:grid-cols-3">
            <Field label="Phone number" required={!profile.phone}><div className="flex min-w-0 gap-2"><input value={profile.phoneCode || 'Select country'} readOnly className="min-w-0 w-1/3 border border-slate-300 bg-slate-50 px-2 py-2 text-sm outline-none" /><input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="Enter number" className="min-w-0 w-2/3 border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /></div></Field>
            <Field label="Email address"><input type="email" value={user?.email || ''} readOnly className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none" /></Field>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6"><button type="button" onClick={handleSave} disabled={saving} className="bg-[#0080d1] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-50">{saving ? 'Updating...' : 'Update profile'}</button>{saveMessage && <p className={`text-sm font-semibold ${saveMessage.includes('successfully') ? 'text-emerald-700' : 'text-red-600'}`} role="status">{saveMessage}</p>}</div>
      </div>

      {isAvatarPickerOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 p-4"><div className="w-full max-w-lg border border-slate-200 bg-white p-5 shadow-xl"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">Choose an avatar</h2><button type="button" onClick={() => setIsAvatarPickerOpen(false)} aria-label="Close avatar picker" className="p-1 text-slate-500 hover:text-slate-900"><X size={20} /></button></div><div className="mb-5 flex flex-col items-center border-b border-slate-200 pb-5"><img src={avatarImage} alt="Current avatar" className="h-24 w-24 border border-slate-200 object-cover" /><label className="mt-3 cursor-pointer border border-[#0080d1] px-4 py-2 text-sm font-bold text-[#0080d1] hover:bg-sky-50">Upload image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarUpload} className="sr-only" /></label><p className="mt-2 text-xs text-slate-500">JPG, PNG, or WebP</p></div><div className="grid grid-cols-4 gap-3 sm:grid-cols-6">{AVATAR_SEEDS.map(seed => <button type="button" key={seed} onClick={() => { setProfile({...profile, avatar: seed}); setIsAvatarPickerOpen(false); }} className={`border p-1 ${profile.avatar === seed ? 'border-[#0080d1]' : 'border-slate-200'}`}><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=eef1f5`} alt={`${seed} avatar`} className="aspect-square w-full object-cover" /></button>)}</div></div></div>}
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block min-w-0 text-sm font-semibold text-slate-700">{label}{required && <span className="ml-1 text-red-500">!</span>}<span className="mt-1 block min-w-0">{children}</span></label>;
}
