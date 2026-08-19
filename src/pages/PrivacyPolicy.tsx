import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Counter from '../components/Counter';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display mb-0">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="animate-appear-0 py-12">
        <div className="container max-w-[1150px] mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div className="styled-scrollbar pr-2 overflow-y-scroll max-h-[800px] grow [&>p]:text-slate-600 [&>p]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-slate-900">
              <p>Last updated: Nov 7, 2025.</p>
              <p>
                If you are looking for "privacy policy" for writers, you can find it{' '}
                <a href="/writer-privacy-policy.html" className="text-blue-500 hover:underline">
                  #
                </a>
                .
              </p>
              <p>
                <i>Version 2. Effective as of Oct 20, 2025</i>
              </p>
              <p>Your privacy is critically important to us. We have a few fundamental principles:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>We are thoughtful about the personal data we ask you to provide and the personal information that we collect about you through the operation of our services.</li>
                <li>We store personal information no longer we really have a need to keep it or when it is required by law.</li>
                <li>We aim to make it as simple as possible for you to control what information on this website is shared publicly (or kept private), indexed by search engines, and permanently deleted.</li>
                <li>We aim for full transparency on how we gather, use, and share your personal information.</li>
              </ul>
              <p>Below is our Privacy Policy, which incorporates and clarifies these principles.</p>

              <h3>Who We Are and What This Privacy Policy Covers</h3>
              <p>
                Hi there! We are the folks behind this website. We are the company Writera Limited, registered in Cyprus, and we will be the Data Controller of your personal data for purposes of this Privacy Policy
              </p>
              <p>This Privacy Policy applies to information that we collect about you when you use:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Our website – boffinglobalgroup.com;</li>
                <li>Our mobile applications (either for Android and iOS); and</li>
                <li>Other products and services that are available on or through our websites (including plagiarism check if any).</li>
              </ul>
              <p>Throughout this Privacy Policy we'll refer to our website, mobile applications, and other products and services collectively as "Services."</p>
              <p>
                We are committed to protect and respect your privacy. This Privacy Policy sets out how we may use, process, and store your personal information. If such personal information can directly or indirectly refer to you as a natural person, such information consists of your "Personal Data" and shall be protected by us with strict accuracy. Below we explain how we collect, use, and share information about you, along with the choices that you have with respect to that information.
              </p>
              <p>If you have any questions about this Privacy Policy, please contact us.</p>

              <h3>How We Can Receive Your Information</h3>
              <p>
                We may get that information from you or our partners, through contracts or other legal arrangements you have with us or our partners on behalf of us, in order to deliver contractual/legal obligations. Your permission and consent can be collected by us directly, or we may receive your personal information from third parties to whom you have given consent to pass this information on to us.
              </p>

              <h3>Information we collect about you</h3>
              <p>If you visit our website or member communities, we may automatically collect information about you, for example:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Technical information</li>
                <li>IP addresses</li>
                <li>Information about what type of device you used to connect to our website</li>
                <li>How you interact with our website.</li>
              </ul>
              <p>
                For more information read our{' '}
                <a href="/cookie-policy.html" target="_blank" className="text-blue-500 hover:underline">
                  Cookie Policy
                </a>
                .
              </p>
              <p>Here you can find the types of Personal Data we collect and the purposes of its processing.</p>

              <table className="es-privacy-policy-table w-full border-collapse my-4">
                <thead>
                  <tr>
                    <th className="border border-slate-400 padding-[10px] text-left align-top">#</th>
                    <th className="border border-slate-400 padding-[10px] text-left align-top">Personal information types</th>
                    <th className="border border-slate-400 padding-[10px] text-left align-top">Purposes we collect your information for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">1</td>
                    <td className="border border-slate-400 p-[10px] align-top">User's Country</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>verification of the User</li>
                        <li>prevention of fraudulent use and resale of User's accounts</li>
                        <li>tax implications, VAT purposes</li>
                        <li>to prevent use in Restricted Jurisdictions</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">2</td>
                    <td className="border border-slate-400 p-[10px] align-top">User's email</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>the main contact of communication with User</li>
                        <li>to provide you with marketing and promotional materials</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">3</td>
                    <td className="border border-slate-400 p-[10px] align-top">User's Name and Surname</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>verification of the User</li>
                        <li>for invoices, billing, and taxation</li>
                        <li>prevention of fraudulent use and resale of User's accounts</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">4</td>
                    <td className="border border-slate-400 p-[10px] align-top">Phone Number</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>verification of the User</li>
                        <li>the contact of immediate communication with User</li>
                        <li>customer support</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">5</td>
                    <td className="border border-slate-400 p-[10px] align-top">City/state/ZIP code/address</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      <ul className="list-disc pl-5">
                        <li>billing information for invoices</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3>Why do we collect Personal Data?</h3>
              <p>We collect information for some or all of the following reasons:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>To provide services to you after you have ordered one of our services through the website;</li>
                <li>To provide information about products or services you have shown interest in purchasing within a reasonable time afterward, if you are already an existing customer;</li>
                <li>To provide information to you about products or services you have purchased from us, or related products or services;</li>
                <li>To provide services to you under contract;</li>
                <li>For legal reasons, for example, if you have entered into a contract with us;</li>
                <li>To provide information to you about our products and services if you have consented to receive it.</li>
              </ul>

              <h3>Grounds of collecting information from you</h3>
              <p>We may collect information from you when we have a legal reason (allowed by law or under contract) to collect the information, or when you have consented for us to do so for a specific purpose (e.g. services provision or newsletters).</p>

              <h3>Legal basis we have for processing your personal data</h3>
              <p>We may process your personal data because:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>We have a contract with you;</li>
                <li>You have given us permission to do so;</li>
                <li>We must provide services to you because you have ordered them;</li>
                <li>You have asked us to do so;</li>
                <li>To comply with the law.</li>
              </ul>
              <p>All of these reasons are reasons we may legally process the information we have about you.</p>

              <h3>Ways of giving information</h3>
              <p>You may give us information about you with your consent, for example:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>By filling in a form or e-mailing us;</li>
                <li>By posting an order at the website;</li>
                <li>Posting reviews and feedbacks at the website;</li>
                <li>Contacting us through our phone numbers.</li>
              </ul>
              <p>This information may be personal, financial, educational, or related to your order.</p>
              <p>You may give us information for legal reasons, such as to enter into a contract with us, when you are buying services from us.</p>

              <h3>Information we receive from other sources</h3>
              <p>We may receive information about you if you use any of the other websites we operate, any other services we provide, or from our business partners entitled to collect information on our behalf.</p>
              <p>
                We also work with third parties (including, for example, business partners, sub-contractors in technical, payment and delivery services, advertising networks, analytics providers, search information providers, credit reference agencies, background checking agencies) and may receive information about you from them as part of the service we provide you, or for other legal reasons.
              </p>
              <p>
                Files. We may collect and store the files you upload, download, or access with the Website. Please do not share with us the files you are not permitted to use. Please do not upload or share with us the files that contain your personal information or personal information of third parties without permission. We may not guarantee that such personal information will be secured.
              </p>

              <h3>Social Sign-in</h3>
              <p>
                You may also register an Account by using your Social Network* account or to later link your account to a Social Network. If you choose to register via a Social Network or link your account, we will use the Personal Data you have provided to the Social Network and that is publicly available (such as your name, email address, gender and other information you make publicly available via the Social Network) to create the account with Social Network. Note that the information we collect from and through the Social Network may depend on the privacy settings you have set with the Social Network and the permissions you grant to us in connection with linking your account on our Website to Your account in Social Network.
              </p>
              <p>
                If your Account is registered using an account with Social Network or if your Account is linked with it, in case you choose to "like" or "share" content or to otherwise share information from or via the Website with Social Network, that information may be publicly displayed, and Social Network may have access to information about you and your use of the Website. Your interactions with third parties through Social Networks or similar features are governed by the respective privacy policies of those third parties. Please note that your relationship with any Social Network is governed solely by your agreement(s) with such Social Network.
              </p>

              <h3>Who might we share your information with?</h3>
              <p>We may share your personal data with third parties, either because you have consented to allow us to do so or for other legal reasons. For example, we may share your personal information with:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Our marketing staff to provide you with promotional materials after you have registered at our website;</li>
                <li>Our group companies, which means our subsidiaries, or our ultimate holding company and its subsidiaries;</li>
                <li>Subcontractors and third parties for the purpose of the performance of a contract that we hold with them or that we hold with you;</li>
                <li>With third parties because you have given consent;</li>
                <li>With third parties who provide us services because you have purchased goods or services.</li>
              </ul>

              <h3>Other reasons we may share your personal information with a third party</h3>
              <p>If Writera Limited or substantially all its assets are acquired by a third party, personal data held by it about its customers will be one of the transferred assets of the company.</p>
              <p>In addition, we will share your personal data with third parties for the following reasons:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>If we must comply with a legal obligation; in certain situations, we may be required to disclose personal data in response to lawful requests by public authorities, including to meet national security or law enforcement requirements.</li>
                <li>If it is legally requested by a government agency;</li>
                <li>To enforce or apply our Website Terms of Use or other agreements;</li>
                <li>To protect the rights, property, or safety of Writera Limited, our customers or others;</li>
                <li>If exchange information with third parties aimed to prevent fraud or to reduce our credit risks.</li>
              </ul>

              <h3>Aggregated data</h3>
              <p>We may, from time to time, provide third parties with data that has been aggregated.</p>
              <p>
                This means that your personal information that could be used to identify you has been removed from the data. Data provided to third parties in this way is not personal data and is only statistics or similar data; however, you do keep your right to object.
              </p>

              <h3>Where we store and process your personal data</h3>
              <p>We primarily store and process your personal data in the EU/European Economic Area or USA. If you are from the EU, by accepting this Privacy Policy, you give us the right to store your personal data in the EEA and USA. We assure you that all your data is encrypted in a secure way and no unauthorized persons may access them.</p>
              <p>For the EU Citizens:</p>
              <p>Some examples of reasons your data may be processed outside the EEA include:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Order fulfillment;</li>
                <li>Payment processing;</li>
                <li>Technical support services.</li>
              </ul>

              <h3>If your personal data cannot be processed within the EEA, we will:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Comply with all data protection principles;</li>
                <li>Where possible, choose a country that is on the list of the EU Commissions' countries that provide adequate protection for the rights and freedoms of data subjects;</li>
                <li>If the transfer is to the United States of America, we will use reasonable endeavors to make sure they participate in the Privacy Shield program;</li>
                <li>Make sure we have assessed the adequacy of protections in all other cases.</li>
              </ul>

              <h3>Access to your personal data via password</h3>
              <p>
                Where we have given you (or where you have chosen) a password that enables you to access certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.
              </p>

              <h3>Transmission and storage of your personal data</h3>
              <p>
                Unfortunately, the transmission of information via the internet is not completely secure. We cannot guarantee the security of your data as it is transmitted and stored, however, we shall use best practice to ensure your data is encrypted to the standard required in the GDPR to protect your personal data.
              </p>

              <h3>How long will we keep your personal data?</h3>
              <p>We will not retain your Personal Data for longer than required.</p>
              <p>We will keep your personal information:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>For as long as required by law</li>
                <li>Until we no longer have a valid reason for keeping it</li>
                <li>Until you request us to stop using it or delete it.</li>
              </ul>
              <p>
                We may keep just enough of your Personal Data to ensure that we comply with your requests not to use your personal information or comply with your right to erasure. For example, we must keep your request to be erased even if it includes your personal data until such time as you are no longer our customer, or for tax purposes etc.
              </p>
              <p>
                If you have questions about our Data Retention Policy, we can provide you a copy. Please contact{' '}
                <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">
                  dpo@phenowriters.ltd
                </a>
                .
              </p>

              <h3>If you chose not to give your personal information to us</h3>
              <p>
                If the Personal Data is necessary in order to provide services to you under a contract between you and Writera Limited, we will have to refuse to enter into that contract or provide the services before you give us your personal information.
              </p>

              <h3>Your Rights</h3>
              <p>We will respect your legal rights to your Personal Data.</p>
              <p>Below are the rights that you have under law, and what we do to protect those rights:</p>

              <table className="es-privacy-policy-table w-full border-collapse my-4">
                <thead>
                  <tr>
                    <th className="border border-slate-400 p-[10px] text-left align-top" style={{width: '30%'}}>Legal right</th>
                    <th className="border border-slate-400 p-[10px] text-left align-top" style={{width: '70%'}}>What we do to protect your rights</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to be informed</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      We are publishing this Privacy Policy to keep you informed as to what we do with your personal information. We strive to be transparent about how we use your data. We will also answer all your questions regarding this Policy send to the{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to access</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      You have the right to access your information. Please contact our Data Protection Officer at{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>{' '}
                      if you wish to access the personal information we hold about you.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to rectification</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      If the information we hold about you is inaccurate or not complete, you have the right to ask us to rectify it. If that data has been passed to a third party with your consent or for legal reasons, then we must also ask them to rectify the data. Please contact our Data Protection Officer if you need us to rectify your information:{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to erasure</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      This is sometimes called 'the right to be forgotten'. If you want us to erase all your personal data and we do not have any legal reason to continue to process and hold it, please contact our Data Protection Officer:{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to restrict processing</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      You have the right to ask us to restrict how we process your data. This means we are permitted to store the data but not further process it. We keep just enough data to make sure we respect your request in the future. If you want us to restrict the processing of your data, please contact our Data Protection Office:{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to data portability</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      We must allow you to obtain and reuse your personal data for your own purposes across services in a safe and secure way without this affecting the usability of your data. Please contact our Data Protection Officer if you want information on how to port your data elsewhere:{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>. This right only applies to personal data that you have provided to us as the Data Controller. The data must be held by us by consent or for the performance of a contract.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to object</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      You have the right to object to us processing your data even if it is based on our legitimate interests, the exercise of official authority, direct marketing (including data aggregation), and processing for purposeless statistics. If you wish to object, please contact our Data Protection Officer:{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to withdraw consent</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      If you have given us your consent to process your data but have changed your mind later, you have the right to withdraw your consent at any time, and we must stop processing your data. If you want to withdraw your consent, please contact our Data Protection Officer:{' '}
                      <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">dpo@phenowriters.ltd</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-[10px] align-top">The right to complain to a Supervisory Authority</td>
                    <td className="border border-slate-400 p-[10px] align-top">
                      <p>
                        You have the right to complain to the Office of the Commissioner for Personal Data Protection if you feel that we have not responded to your requests to solve a problem. You can find their contact details here:
                      </p>
                      <p className="mt-2">
                        Office of the Commissioner for Personal Data Protection
                        <br />
                        Kypranoros 15, Nicosia 1061, Cyprus
                        <br />
                        P.O.Box 23378, 1682 Nicosia, Cyprus
                        <br />
                        Tel: <a href="tel:+35722818456" className="text-blue-500 hover:underline">+357 22818456</a>
                        <br />
                        Fax: +357 22304565
                        <br />
                        Email:{' '}
                        <a href="mailto:commissioner@dataprotection.gov.cy" className="text-blue-500 hover:underline">
                          commissioner@dataprotection.gov.cy
                        </a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3>Links to Other Websites</h3>
              <p>
                From time to time, our website may contain links to and from websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites may have their own privacy notices and that we do not accept any responsibility or liability for any such notices. Please check these notices, where available, before you submit any personal data to these websites.
              </p>

              <h3>Age Limitations</h3>
              <p>
                To the extent prohibited by applicable law, we do not allow the use of our Services and Websites by anyone younger than 16 years old. If you learn that anyone younger than 16 has unlawfully provided us with personal data, please contact us and we will take steps to delete such information.
              </p>

              <h3>Changes to this Privacy Policy</h3>
              <p>
                We may change this Privacy Policy from time to time. Laws, regulations and industry standards evolve, which may make those changes necessary, or we may make changes to our business. We will post the changes to this page and encourage you to review them to stay informed. If we make changes that materially alter your privacy rights, we will provide additional notice, such as via email or through the Website. If you disagree with the changes to this Privacy Policy, you should deactivate your account.
              </p>

              <h3>The Laws and Regulations</h3>
              <p>The laws that govern personal data in EU are:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>REGULATION (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data and repealing General Data Protection Regulation ("GDPR")</li>
                <li>Law providing for the Protection of Natural Persons with regard to the Processing of Personal Data and for the Free Movement of such Data of 2018 (Law 125(I)/2018)</li>
              </ul>

              <h3>How can you reach us?</h3>
              <p>This is our registered address, company number and contact information:</p>
              <p>
                Writera Limited
                <br />
                Address: Vasili Michailidi, 9, 3026, Limassol, Cyprus
                <br />
                Company Registration Number:
                <br />
                Email:{' '}
                <a href="mailto:dpo@phenowriters.ltd" className="text-blue-500 hover:underline">
                  dpo@phenowriters.ltd
                </a>
              </p>

              <h3>Previous Versions</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Current version (Nov 7, 2025)</li>
                <li>
                  <a href="/archive/policy/374.html" className="text-blue-500 hover:underline">
                    May 23, 2018
                  </a>
                </li>
                <li>
                  <a href="/archive/policy/740.html" className="text-blue-500 hover:underline">
                    Jan 17, 2017
                  </a>
                </li>
              </ul>
            </div>

            {/* Sidebar Navigation */}
            <div className="grow shrink-0 lg:w-[264px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col text-sm font-semibold">
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/refund-policy.html">Refund Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/confidentiality-policy.html">Confidentiality policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/terms-and-conditions.html">Terms & Conditions</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/cookie-policy.html">Cookie Policy</a>
                <a className="block border-b px-2 py-3 text-blue-900 bg-slate-50 border-blue-500" href="/privacy-policy.html">Privacy Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/discount-policy.html">Discount Policy</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-8 animate-appear-0 mx-4 font-['Open_Sans',sans-serif]">
        <div className="max-w-[1150px] mx-auto rounded-[12px] pb-8 sm:pl-[196px] pt-[158px] sm:pt-8 relative sm:px-8 flex items-center shadow-lg flex-col sm:flex-row gap-4 border border-slate-50 border-solid bg-white">
          <img
            className="-mt-16 absolute top-[70px] left-0 right-0 mx-auto sm:row-auto sm:mx-0 sm:top-auto sm:bottom-0 sm:left-8 shrink-0"
            src="/next/img/illustration/shark-cta-default.svg"
            alt=""
            width="151"
            height="143"
            loading="lazy"
          />
          <h2 className="subtitle mb-0 grow text-center sm:text-left text-[20px] md:text-[22px] lg:text-[26px] font-bold text-[#424242] leading-[28px] md:leading-[31px]">
            Find an essay writer for your next order
          </h2>
          <a
            href="/registration"
            aria-label="Order now"
            className="button primary-orange inline-flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#0080d1] text-white hover:bg-[#004695] border-[2px] border-solid border-[#0080d1] hover:border-[#004695] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
          >
            Order now
          </a>
        </div>
      </section>

      {/* Count Stats Section */}
      <section className="animate-appear-0 js--stats js--service-stats overflow-hidden py-16 md:py-24">
        <div className="container max-w-[1150px] mx-auto px-4 relative z-[1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Counter as="div" value={15} suffix="+" className="stat-number" id="years_on_market" />
              <p className="stat-label">Years on the market</p>
            </div>
            <div>
              <Counter as="div" value={9.65} suffix="/10" className="stat-number" id="quality_score" />
              <p className="stat-label">Average quality score</p>
            </div>
            <div>
              <Counter as="div" value={57} suffix="K+" className="stat-number" id="returning_customers" />
              <p className="stat-label">Returning customers</p>
            </div>
            <div>
              <Counter as="div" value={46} suffix="" className="stat-number" id="writers_count" />
              <p className="stat-label">Writers active daily</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
