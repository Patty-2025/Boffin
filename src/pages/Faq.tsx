import React, { useState } from 'react';
import SEO from '../components/SEO';
import Counter from '../components/Counter';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const generalFAQ: AccordionItem[] = [
  {
    id: 'how-works',
    question: 'How does our writing service work?',
    answer: 'You may find it helpful to visit the How it works page to learn all the details on how to cooperate with our site. After reading the detailed guide or watching the tips, you will learn everything you need to know about working with our authors.'
  },
  {
    id: 'order-form',
    question: 'How do I complete the order form?',
    answer: 'On the page of our site, you can find a short form in which you will need to select the type of task and the number of pages, the deadline, and your email. After you choose the previously described data, you need to click on the "Continue" button to be redirected to the second - extended form. You will receive an email with a password for your account, which you can change if necessary. In a large form, you will need to add all the materials required for the author, write instructions, and much more regarding your paper. On the "How It Works" page, you can learn more about working with Boffin Global.'
  },
  {
    id: 'send-materials',
    question: 'How can I send your author a case study/article/material?',
    answer: 'You can send everything you need to complete your task to the author in any format convenient for you during the ordering process.'
  },
  {
    id: 'format',
    question: 'In what format can you fulfill the received order?',
    answer: (
      <>
        While you place an order asking for <a href="/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">write my essay</a> help, you can choose any size you need for your paper. For example, it could be APA, MLA, Chicago, etc. You also need to specify your additional formatting preferences, if any, at the time of ordering.
      </>
    )
  },
  {
    id: 'forgot-password',
    question: 'What should I do if I forget my password?',
    answer: 'If you have forgotten your account password, follow the Forgot password link, which will be located on the account login page near the "Login" button.'
  },
  {
    id: 'free-order',
    question: 'Can I submit an order to Boffin Global for free?',
    answer: 'Our answer is "Yes" because each client has the opportunity to get acquainted with early authors before reserving funds on the balance sheet. After you complete the checkout, you can write up to 100 words to the author to test their skills and make sure they are right for you.'
  },
  {
    id: 'social-responsibility',
    question: 'Do you consider yourself socially responsible?',
    answer: 'Our service is very sensitive to social responsibility and moral canons. Therefore, we never take papers with provocative topics like abortion or gay marriage. Cases that do not fit into the social responsibility framework are automatically rejected in the order form.'
  },
  {
    id: 'online-test',
    question: 'Can you order an online test, exam, or other types from your author?',
    answer: 'We strive to help every student, and at the same time, we are sure that our clients can cope with their exams, and they need our help to get more free time. Orders for passing tests and exams are automatically deleted by our system, as this does not fit into the fundamental principles of our work with students.'
  }
];

const orderFAQ: AccordionItem[] = [
  {
    id: 'finished-paper',
    question: 'When can I see the finished paper?',
    answer: 'When registering an order, you specify the deadlines which the author must meet, and our service, in turn, guarantees the timely delivery of each order. Since the cost also depends on the timing, you need to think carefully about how and when you want to receive your order. The minimum time for which we can fulfill your order is 2 hours, provided that it is on one page.'
  },
  {
    id: 'receive-order',
    question: 'How can I receive my order?',
    answer: 'For us, the convenience of customers comes first because you have a choice between two formats, namely MS Word and PDF. After you select the format you need, your file will be saved in this format to your computer during installation.'
  },
  {
    id: 'modify-instructions',
    question: 'How can I modify the ordering instructions?',
    answer: 'You need to click on the "Edit order details" button to change the page number, title, and deadline so that the author can see your changes. After the author starts working on the paper, you will no longer be able to make changes, as our system does not provide this, so our cooperation is streamlined.'
  },
  {
    id: 'dislike-order',
    question: 'What if I don\'t like my order?',
    answer: 'If you would like to know what your author will write for you, you can always discuss all the details that do not suit you. You have the opportunity to discuss this in your correspondence and explain to the author what exactly you think should be rewritten. It would be best if you also remembered that you can make changes before you click on the "Done" button.'
  },
  {
    id: 'editing-rewriting',
    question: 'What do editing and rewriting mean in your service?',
    answer: 'Editing and rewriting will be handy if you already have a first draft and most of the material is finished. Both services will require you to upload your original paper, so you won\'t have to pay to start from scratch. Editing itself means text formatting and making changes to the report, which must fully comply with a specific format. Only 25-30% of the content of your paper can be edited, while rewriting consists of corrections, proofreading, and editing of longer content up to and including 70% of the text.'
  }
];

const writerFAQ: AccordionItem[] = [
  {
    id: 'author-location',
    question: 'Where will my author be from, and where are you located?',
    answer: 'Our team has authors from all over the world, both from English-speaking countries and non-English-speaking countries. You can always ask your author in the chat for information that you are interested in additionally. Our company is located in Cyprus.'
  },
  {
    id: 'professional',
    question: 'Can I be sure that all service sites are professional?',
    answer: (
      <>
        You can be sure that all the authors who work for Boffin Global are professionals who can back up their skills with education. Their experience helps them create quality papers for students. All authors of our site go through several stages of testing and are always under the supervision of the Writers Department. With our open rating system, you can see ratings from clients to writers. When bidding, you can base your selection on the following:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>The author's style and writing approach on the paper's first page.</li>
          <li>Work history with reviews and ratings of an <a href="/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">essay writer</a>.</li>
        </ul>
      </>
    )
  },
  {
    id: 'rating-calculation',
    question: 'How exactly is the author\'s rating calculated? And what is the rating of the author?',
    answer: 'To guarantee our authors a transparent competition, we have created a rating system that helps our clients make the right choice. It also encourages our authors to improve their skills every time. The author\'s rating is calculated automatically based on the voting of clients who worked with him or her. Also, next to the rating, you can see the number of completed orders by the author and understand how much experience the author has. Recently we\'ve added a possibility for the writer to add their portfolio to their profiles.'
  },
  {
    id: 'awards',
    question: 'What exactly do the authors\' awards mean?',
    answer: 'The awards on our website are created based on a rating to encourage our writers to work. In the author\'s description, you can see how many times he or she has been awarded. To independently verify the professionalism of the authors of our service, you can view our Top writers page. If you would like to learn more about the types of our awards, you can visit the Rating & awards page.'
  },
  {
    id: 'writer-warning',
    question: 'How do I understand what a writer\'s warning is?',
    answer: 'It is essential for our company that all the authors who work with us are highly qualified and able to communicate with our clients appropriately. If we notice plagiarism in the author\'s work, a late delivery of the order, or unprofessional correspondence with the client, we issue a warning to the author. This can also happen if the client reports their dissatisfaction in the course of cooperation with the author. With the help of notifications, we give the writers methods of improvement, and if they adhere to our standards, they can continue working with our service.'
  }
];

const paymentFAQ: AccordionItem[] = [
  {
    id: 'payment-safety',
    question: 'How safe is it to pay for the paper? Can I securely make payments on your site?',
    answer: 'You can pay for your work using two options: transfer funds to the balance of the Boffin Global website and only then pay from it, or immediately use ApplePay via SolidGate, ECommPay, or SolidGate. Our clients can be sure that each payment method is safe and secure as our finance department checks each one very carefully before adding it to the site.'
  },
  {
    id: 'refund',
    question: 'How can I pay the author? Will I be able to request a refund?',
    answer: (
      <>
        <p>In Boffin Global, the client manages the work process and decides when exactly to pay. We advise customers to make payment immediately after carefully checking the completed piece of paper. And at the same time, it is essential to remember that the revision will not be available after the order is fully completed.</p>
        <p className="mt-2">Our system divides payment into parts depending on the deadline and the number of pages. For example, if you have 2 pages and the deadline is more than 24 hours, the payment will be split into 2 parts. On our site, you can divide the amount into 5 parts. And if the order consists of only one page, then the payment, in any case, will consist of 2 pieces without reference to the deadline.</p>
        <p className="mt-2">You can pay for the work of the author by clicking the "Release" button, and at the same time, you need to remember that the money that you have already paid to the author using this button is non-refundable. Check out the Refund policy for more information on the topic.</p>
      </>
    )
  },
  {
    id: 'discount',
    question: 'Can I get a discount on your website?',
    answer: 'At Boffin Global, we always strive to be accessible while being honest with our contributors. Our team does not interfere in the bidding process so that clients and authors can feel complete freedom in cooperation. In this way, we make prices affordable for everyone and, at the same time, keep the payment of writers high.'
  },
  {
    id: 'uniqueness',
    question: 'How exactly can I make sure that my paper is unique?',
    answer: 'You can use the Check for plagiarism option to ensure your order is unique. With it, you can check each part of the order as often as you need. At the same time, you do not need to pay for verification because it is free for our customers. If you see an insufficient level of uniqueness, immediately inform the author so that he can correct the situation.'
  },
  {
    id: 'confidential',
    question: 'Is your service completely confidential?',
    answer: 'We can guarantee complete confidentiality to each of our clients, and we are sure of it. When registering, you are not asked for anything other than an email that is only needed for registration and notification of cooperation progress. We ask our clients not to share their information when communicating with authors so that we can take care of their privacy. You can read more about the principles of anonymity on the Confidentiality policy.'
  },
  {
    id: 'delete-account',
    question: 'Can I delete my account?',
    answer: 'You can delete your account at any time convenient for you. Remember that later you will not be able to restore your account, and to use our service again, you will need to create it again.'
  },
  {
    id: 'payment-cancelled',
    question: 'What happens to my order if my payment is canceled?',
    answer: 'When you decide to debit a specific amount from your account, the exact amount will be debited from your Boffin Global account. It is essential to remember that if the amount of funds that you are trying to write off is more than the amount that is on the balance sheet, then all orders are canceled by the system. If you encounter a similar problem, you should contact support.'
  }
];

interface TabItem {
  id: string;
  label: string;
  content: AccordionItem[];
}

const tabs: TabItem[] = [
  { id: 'general', label: 'General ordering info', content: generalFAQ },
  { id: 'order', label: 'Order completion', content: orderFAQ },
  { id: 'writer', label: 'Writer info', content: writerFAQ },
  { id: 'payment', label: 'Payment, plagiarism, and confidentiality issues', content: paymentFAQ }
];

export default function Faq() {
  const [activeTab, setActiveTab] = useState('general');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentTabContent = tabs.find(t => t.id === activeTab)?.content || [];

  return (
    <main className="pt-[72px] bg-slate-50 min-h-screen text-slate-800">
      <SEO 
        title="Customer FAQ | Boffin Global Group"
        description="Find answers to frequently asked questions about Boffin Global's essay writing service, ordering process, writers, and payment options."
        keywords="FAQ, frequently asked questions, essay writing service, Boffin Global, customer support"
        canonicalUrl="/faq"
      />

      {/* Hero Section */}
      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-slate-900">
            Frequently Asked Questions From Our Customers
          </h1>
          <p className="text-base md:text-lg text-grey-400 mb-2 max-w-2xl leading-relaxed">
            Check the received paper in one click to make sure it is totally original
          </p>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="animate-appear-0 py-16 md:py-24">
        <div className="container max-w-[1150px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_264px] gap-6 lg:grid-cols-[1fr_264px] justify-center">
            {/* Main FAQ Content */}
            <div className="js--customer-faq-tabs">
              {/* Tab Buttons */}
              <div className="flex flex-nowrap gap-2 bg-slate-100 rounded-12 p-2 mb-6 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-3 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label={tab.label}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Accordion Items */}
              <div className="bg-white rounded-12 border border-solid border-slate-50 overflow-hidden">
                {currentTabContent.map((item, index) => (
                  <div
                    key={item.id}
                    className={`border-b border-solid border-slate-50 ${
                      index === currentTabContent.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex justify-between items-center p-4 md:p-6 hover:bg-slate-50 transition-colors"
                      aria-expanded={expandedItems[item.id]}
                    >
                      <h2 className="text-[18px] md:text-[24px] leading-[1.5] font-semibold text-left text-slate-900 pr-4">
                        {item.question}
                      </h2>
                      <ChevronDown
                        size={24}
                        className={`shrink-0 transition-transform ${
                          expandedItems[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedItems[item.id] && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6 text-grey-300 space-y-2">
                        {typeof item.answer === 'string' ? (
                          <p>{item.answer}</p>
                        ) : (
                          item.answer
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Card */}
            <div className="flex flex-col items-center p-4 h-fit bg-blue-900 text-white rounded-12">
              <span className="text-lg font-bold mb-4">Do you have any questions left?</span>
              <img
                className="max-w-full"
                src="/next/img/illustration/shark-support.svg"
                alt=""
                loading="lazy"
                width="200"
                height="200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
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
            Find an essay writer for your next order.
          </h2>
          <Link
            to="/registration"
            aria-label="Get started"
            className="button primary-orange inline-flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#0080d1] text-white hover:bg-[#004695] border-[2px] border-solid border-[#0080d1] hover:border-[#004695] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* Count Stats Section */}
      <section className="animate-appear-0 js--stats js--service-stats overflow-hidden py-16 md:py-24">
        <div className="container max-w-[1150px] mx-auto px-4 relative z-[1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Counter as="div" value={15} suffix="+" className="stat-number" id="years_on_market" />
              <p className="stat-label">
                Years on the market
              </p>
            </div>
            <div>
              <Counter as="div" value={9.65} suffix="/10" className="stat-number" id="quality_score" />
              <p className="stat-label">
                Average quality score
              </p>
            </div>
            <div>
              <Counter as="div" value={57} suffix="K+" className="stat-number" id="returning_customers" />
              <p className="stat-label">
                Returning customers
              </p>
            </div>
            <div>
              <Counter as="div" value={46} suffix="" className="stat-number" id="writers_count" />
              <p className="stat-label">
                Writers active daily
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
