import React from 'react';
import CountryLanding from './CountryLanding';

export default function AustraliaPage() {
  return (
    <CountryLanding 
      countryName="Australia"
      countryCode="AU"
      adjective="Australian"
      institutions={[
        "University of Melbourne",
        "University of Sydney",
        "Australian National University",
        "University of Queensland",
        "UNSW Sydney",
        "Monash University",
        "University of Adelaide",
        "University of Western Australia"
      ]}
      stats={{
        experts: "1,500+",
        score: "9.9/10"
      }}
      seoContent1="As a student in Australia, studying at prestigious institutions like the University of Melbourne and the University of Queensland involves navigating high academic expectations. Group of Eight universities demand advanced research depth and critical analysis that can feel challenging when you are balancing multiple subjects."
      seoContent2="The Australian education landscape is diverse and internationally recognized. However, pressure to maintain academic excellence within this vibrant environment is constant. Our premium 'Assignment Support Service' is designed to be your academic partner, delivering model papers that help you master your specific course requirements and formatting styles."
    />
  );
}
