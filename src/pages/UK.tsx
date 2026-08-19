import React from 'react';
import CountryLanding from './CountryLanding';

export default function UKPage() {
  return (
    <CountryLanding 
      countryName="the United Kingdom"
      countryCode="UK"
      adjective="UK"
      institutions={[
        "Oxford University",
        "Cambridge University",
        "Imperial College London",
        "UCL",
        "London School of Economics (LSE)",
        "University of Edinburgh",
        "King's College London",
        "University of Manchester"
      ]}
      stats={{
        experts: "1,800+",
        score: "9.8/10"
      }}
      seoContent1="As a student navigating the prestigious higher education sector in the UK—from Oxford and Cambridge to the Russell Group—you are engaged in a rigorous academic landscape that demands advanced critical synthesis, independent research, and precise adherence to conventions such as OSCOLA and Harvard."
      seoContent2="Succeeding in the competitive British academic environment can be challenging. Our professional 'Assignment Support Service' is designed to be your dedicated academic partner, delivering high-quality, reliable model papers that help you master your specific course requirements while meeting the highest British academic standards."
    />
  );
}
