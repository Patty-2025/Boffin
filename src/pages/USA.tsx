import React from 'react';
import CountryLanding from './CountryLanding';

export default function USAPage() {
  return (
    <CountryLanding 
      countryName="the United States"
      countryCode="US"
      adjective="American"
      institutions={[
        "Harvard University",
        "Stanford University",
        "MIT",
        "Yale University",
        "Columbia University",
        "University of California, Berkeley",
        "Princeton University",
        "University of Chicago"
      ]}
      stats={{
        experts: "2,500+",
        score: "9.9/10"
      }}
      seoContent1="Studying in the United States offers significant academic opportunities. The American academic system is distinct, prioritizing proactive participation, critical discourse, and rigorous adherence to formatting conventions such as APA, MLA, and Chicago styles, which can be challenging to navigate for students from diverse educational backgrounds."
      seoContent2="Succeeding in the competitive American academic environment requires dedication, clarity, and precision. Our professional 'Assignment Support Service' is here to act as your dedicated partner, providing high-quality model papers and insights to help you excel in your coursework and successfully navigate the specific requirements of your institution."
    />
  );
}
