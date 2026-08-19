const fs = require('fs');

const rawHtml = `<section>
  <div class="container max-w-[1000px] mx-auto px-6 py-16">
    <div class="text-container animate-appear-0">
      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6">Our College Essay Writing Service Is a Safe Place for Students</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        We know that the number of scams has risen dramatically, and feeling secure is what you are
        looking for when browsing online helpers. Thus, the experts at our essay writing service
        have installed guarantees that always keep our clients absolutely safe. So, here is what you
        can count on when you come to BoffinGlobal with your “I want to pay someone to write my essay”
        request.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">100% originality</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Over our years of experience, we have learned how important authenticity is. That’s why
        every college paper writer at our service creates papers from scratch. We also use a
        reliable plagiarism checker and provide reports for every order, so you can stay confident
        about the originality of the final draft.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">24/7 support</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Our support team understands that questions can come up at any moment, and that is the
        reason we are available 24/7 to guide you through every step of the process, whatever custom
        essay writing service you have requested. Need updates or help with your order? We’re always
        here to make the process stress-free.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Privacy for your data</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We prioritize your confidentiality. Thus, your personal details, as well as order
        information, always remain private when you turn to us for essay writing services. We use
        secure systems which protect your data, and we never share any kind of information publicly.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Security for your payments</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Our professional essay writing service uses secure technologies to protect payments as well.
        At BoffinGlobal, we use encryption and trusted payment systems to ensure every transaction is
        safe.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Money-back guarantee</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We stand behind the quality of every college paper writing service we deliver, and our fair
        and transparent refund policy is here to prove it. We are always here to help you solve any
        issue, and if something doesn’t go as expected, we are here to find the best solution for
        you. If there is no other solution, you can request a refund.
      </p>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Explore the Best Essay Services Provided by BoffinGlobal</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        For years, we have been gathering writers from around the world in order to create an
        organization that aspiring learners can turn to and get the needed writing assistance with
        their academic papers. Today, BoffinGlobal is an all-in-one solution for many, with a large
        pool of experts in 75+ disciplines providing all possible types of writing assistance. From
        a simple essay to a full dissertation, we can help with anything you need. If you are still
        wondering if we can help you with your assignment, you can always browse the list of
        services on our website.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Write my essay help</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Our expert writers offer professional essay services to help students overcome writer’s
        block and create strong arguments in their writing tasks. With us, you always get
        well-organized, insightful essays tailored to your academic expectations.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Coursework writing</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Our college paper writing service will also assist with complex coursework, helping you
        follow strict guidelines and meet tough deadlines with accurately structured assignments.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Research paper</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We professionally support you with research, analysis, and formatting for your research
        papers; our experts know how to build strong arguments, find credible sources, and properly
        structure academic papers.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Presentation creation</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        BoffinGlobal professionals create engaging presentations that can help you communicate ideas
        and feel more confident presenting complex topics in front of your audience.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Speech writing</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Students ask our experts to craft compelling speeches by solving issues related to clarity
        and tone. If you need to deliver confident, persuasive messages suited to your audience and
        purpose, our experts can definitely help.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Thesis writing</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We professionally guide you through challenging thesis projects and help with research and
        argument development so that you come up with a clear, coherent, and academically strong
        piece.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Scholarship essay</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Our college paper writers will help you highlight your achievements and compose persuasive
        applications. For many young adults, self-presentation is a true challenge, but with our
        assistance, you can learn how to structure your writing as well as improve your chances of
        winning competitive scholarships.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Personal statements</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We can assist with writing impactful personal statements and help you express your goals,
        experiences, and strengths clearly while showing you how to avoid clichés and weak
        storytelling.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Case study</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        The experts at BoffinGlobal know pretty well how to simplify complex case studies as well as
        analyze data, apply theory, and present logical solutions in an academic format.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Dissertation composition</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Our essay help service provides support with large-scale dissertation projects and helps you
        manage research in order to help you come up with a coherent, detailed, and academically
        rigorous final paper. If you feel that this is a point you feel uncomfortable with and quite
        weak on, we are here to help you out.
      </p>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Professional Essay Writers for Hire: Why Our Bidding System Is Your Best Choice</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        One of our strongest sides is our bidding system. It allows us to support students who are
        pressed for budget as well as provide our essay writers online with financial benefits which
        they consider appropriate.
      </p>
      <p class="text-[18px] text-[#424242] mb-4">
        So, what is special about this system? First, you place your “write my college essay” order
        and get bids from writers. Then, you choose one to your liking and within your financial
        capacities. This means that you are the one who makes a choice. Most online essay writing
        services take your requests and assign writers to them, but with BoffinGlobal, you can do so
        independently.
      </p>
      <p class="text-[18px] text-[#424242] mb-4">
        No worries, if you have no time to choose a writer, to browse bids and experts’ profiles,
        you can ask our support team to help you choose the best candidate. In this case, we will
        ask you to provide us with all possible nuances and demands so we can choose the best option
        for your personal needs.
      </p>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Human College Essay Writers vs. AI Assistance: What to Choose?</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        Can you imagine your actual life without AI? Actually, it is everywhere now, and academic
        life is no exception. Of course, AI cannot substitute a human entirely in terms of offering
        the best essay services, and you definitely understand that; AI is okay, but you always have
        to keep the nuances in mind. When you need help with academic writing, AI can be a great
        supporter, but it still comes with its own drawbacks. Thus, before you start asking AI to
        create your writing task for you, ensure that you know the pitfalls you may stumble upon.
      </p>

      <div class="table-wrapper overflow-x-auto my-8">
        <table class="styled-table w-full text-left border-collapse border border-[#dde6ef]">
          <thead>
            <tr class="bg-[#f1f5f9]">
              <th class="p-4 border border-[#dde6ef] text-[#424242]"><strong>Aspect</strong></th>
              <th class="p-4 border border-[#dde6ef] text-[#424242]"><strong>Human assistance at our essay service</strong></th>
              <th class="p-4 border border-[#dde6ef] text-[#424242]"><strong>AI assistance</strong></th>
            </tr>
          </thead>
          <tbody class="text-[16px] text-[#424242]">
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Speed</strong></td>
              <td class="p-4 border border-[#dde6ef]">The human experts at BoffinGlobal take more time but can plan, research, and refine the work thoughtfully according to your needs.</td>
              <td class="p-4 border border-[#dde6ef]">AI tools usually deliver content in a few seconds, but there are questions concerning the quality of the results, so this is only a better solution for quick drafts.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Quality</strong></td>
              <td class="p-4 border border-[#dde6ef]">An essay writer for hire is more likely to deliver in-depth analysis with strong arguments and academic precision.</td>
              <td class="p-4 border border-[#dde6ef]">AI is more suitable for general content but often lacks depth.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Plagiarism</strong></td>
              <td class="p-4 border border-[#dde6ef]">Writers usually complete original content.</td>
              <td class="p-4 border border-[#dde6ef]">There is always a risk that you will get a plagiarized text.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Language</strong></td>
              <td class="p-4 border border-[#dde6ef]">A college essay writer with years of experience can adapt a text’s vocabulary and complexity to the academic level and discipline you request help with.</td>
              <td class="p-4 border border-[#dde6ef]">AI usually offers grammatically correct texts, but they often sound too machine-like.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Tone</strong></td>
              <td class="p-4 border border-[#dde6ef]">When you pay someone to write essay, they will adjust the tone to suit the purpose you set, be it formal, persuasive, analytical writing, or anything else.</td>
              <td class="p-4 border border-[#dde6ef]">AI tools usually stick to a neutral and robotic tone.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Practical part</strong></td>
              <td class="p-4 border border-[#dde6ef]">A human writer can handle calculations, case studies, and real-world applications effectively based on their experience.</td>
              <td class="p-4 border border-[#dde6ef]">AI often struggles with complex tasks which require practical parts because they are predominantly taught on theoretical data.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Bias</strong></td>
              <td class="p-4 border border-[#dde6ef]">A top essay writer at BoffinGlobal can critically assess and present balanced, objective arguments.</td>
              <td class="p-4 border border-[#dde6ef]">Users often claim that AI reflects hidden biases drawn from training data.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Relevance</strong></td>
              <td class="p-4 border border-[#dde6ef]">Human writers focus on assignment requirements, key questions, and up-to-date information.</td>
              <td class="p-4 border border-[#dde6ef]">AI can lack some relevant knowledge and provide you with incorrect data.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Mistakes</strong></td>
              <td class="p-4 border border-[#dde6ef]">Of course, there is always a human factor that can affect the final draft, but a writer can review, edit, and fact-check your piece to reduce inaccuracies.</td>
              <td class="p-4 border border-[#dde6ef]">AI usually provides grammatically correct content but can offer unnoticed factual or logical errors.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Personal touch</strong></td>
              <td class="p-4 border border-[#dde6ef]">A professional essay writer can bring a unique perspective and a natural, engaging writing style.</td>
              <td class="p-4 border border-[#dde6ef]">AI lacks individuality and real-life insight, which serves as a limit for quality and well-researched work.</td>
            </tr>
            <tr>
              <td class="p-4 border border-[#dde6ef]"><strong>Questions</strong></td>
              <td class="p-4 border border-[#dde6ef]">You can contact our best essay service and ask questions; as a result, he/she will fix them based on your feedback.</td>
              <td class="p-4 border border-[#dde6ef]">AI cannot clarify unless it is prompted again.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-[18px] text-[#424242] mb-4">
        Choosing how you use AI assistants is always your own responsibility, but remember these
        points anytime you ask a tool for help.
      </p>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Write My College Essay: Why Students Choose Us</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        For 15+ years, we have been offering essay help online to students with their writing tasks.
        Having risen from a small group of enthusiasts, we have created a large company with 500+
        college essay writers on staff who have already helped thousands of learners and are
        constantly getting new requests. We believe that the reason for our popularity is what
        clients get from us; they get total calm, quality results, and a pleasant experience that
        helps them survive a turbulent period in their lives. If you are wondering if we are what
        you need, take a look at the strongest features that our clients usually name in their
        feedback when hiring online essay writers from BoffinGlobal.
      </p>
      <ul class="list-disc pl-6 text-[18px] text-[#424242] space-y-3 mb-8">
        <li><strong>Flexible pricing</strong>. We offer flexible pricing through our bidding system that allows you to choose options that fit your budget and deadlines.</li>
        <li><strong>Years of experience</strong>. With years of experience in academic writing, we understand university standards and the common challenges you might face. Thus, we know how to deliver relevant papers that meet academic requirements.</li>
        <li><strong>Professional human writers</strong>. We carefully select the professional essay writers who join us and make sure they have strong academic backgrounds. We train every candidate to handle complex assignments and deliver high-quality work that helps college students improve their academic performance.</li>
        <li><strong>Freebies</strong>. With us, you can enjoy free extras such as plagiarism reports, formatting, and revisions to make the process smoother. These added benefits, which often require payment with other companies, enhance the overall quality of your “write my college essay for me” order and ensure transparency.</li>
        <li><strong>24/7 availability</strong>. We operate 24/7, so you can place orders, ask questions, or request updates day or night. With BoffinGlobal, you always have access to help, regardless of time zones or urgent academic situations.</li>
        <li><strong>Thousands of positive reviews</strong>. We have thousands of positive reviews which reflect real experiences and demonstrate our consistent performance, so new users can see why our service is a good option for their academic needs.</li>
        <li><strong>Direct communication</strong>. Using our services, you will communicate directly with your quick essay writer. This way, you can clarify instructions, track progress, and make adjustments if needed anytime.</li>
        <li><strong>Strict rules and terms</strong>. We follow strict internal rules and academic standards to ensure quality and integrity. These include originality requirements, verification processes, and quality checks. We always make sure clients understand these rules before they pay for essay assistance.</li>
      </ul>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Pay Someone to Write My Essay: How BoffinGlobal Selects Writers</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        We highly appreciate students’ trust, and we always take the hiring process seriously. Thus,
        when a candidate comes to us in order to become a part of our team, we always make sure
        their skills and knowledge fit our standards and demands. Thus, every essay writer has to
        pass a certain evaluation process and demonstrate their expertise in practice before we say,
        “Welcome to the team.”
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Theoretical aspects of academic writing</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Before joining our team, every candidate must demonstrate a strong understanding of academic
        writing principles. We evaluate their knowledge of structure, citation styles,
        argumentation, academic tone, etc. This step is essential to assess if our professional
        essay writers for hire can meet strict academic standards and produce strong papers across
        various disciplines and assignment types.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Subject expertise and types of assignments</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        At BoffinGlobal, we carefully assess each candidate’s subject knowledge and ability to handle
        different types of tasks because we want to be sure we always match you with experts who
        truly understand their topics and your academic needs.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Practical application of knowledge</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Candidates complete a real-life writing task that is similar to a typical student
        assignment. Remember that these are not the assignments you ask for on our website; these
        tasks are specifically created by our experts. Only those who deliver high-quality work move
        forward in the hiring process.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">A personal interview with an experienced writer from BoffinGlobal</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Each candidate participates in a personal interview with one of our experienced writers.
        During this stage, we assess their communication skills, professionalism, and
        problem-solving abilities in order to see if the writer can write an essay for you at a high
        level.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">A probation period with a mentor</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        New writers begin with a probation period under the guidance of an experienced mentor from
        our college essay writing service. During this time, their work is closely monitored and
        reviewed for quality and adherence to standards. This way, we make sure the candidate
        understands what we expect and see if the provided content meets our standards.
      </p>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Professional Essay Writing Service for All Kinds of Students</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        Oftentimes, people think that our professional paper writing service is targeted at lazy
        learners who are irresponsible, but rest assured that this attitude is totally wrong. We
        believe that asking for help is okay, especially if someone realizes that they can’t handle
        an issue independently. If you still believe that students who request help are just those
        who want to get rid of their responsibilities and have some fun, here is a list of the types
        of clients who usually come to us for assistance.
      </p>
      <ul class="list-disc pl-6 text-[18px] text-[#424242] space-y-3 mb-8">
        <li><strong>People with little to no experience in academic writing</strong>. When you are new to academic writing, it’s normal to feel unsure about how to build strong arguments. You may spend too much time trying to understand instructions instead of actually writing. We are a fast essay writing service that can help you make things clear. With BoffinGlobal, you can learn the basics, improve your skills, and feel more confident in dealing with future assignments.</li>
        <li><strong>College students who are overloaded with tasks</strong>. If you are dealing with multiple deadlines at once, it’s easy to feel overwhelmed and unable to focus properly on each assignment. This often leads to stress and lower-quality work. We can take over time-consuming writing tasks and deliver structured papers on time. Manage your workload better, reduce pressure, and keep your academic performance stable even during the busiest periods.</li>
        <li><strong>Professionals who combine part-time work and education</strong>. If you are working while studying, there may be little space for proper writing and research. This can lead to exhaustion and constant time pressure, but we can help you handle everything without sacrificing quality.</li>
        <li><strong>Adult students who combine university and parenting.</strong> If you are studying while raising a child, your schedule is likely unpredictable, and finding quiet time for assignments can be extremely difficult. BoffinGlobal can help you prepare well-structured papers and save you time as well as reduce stress, so you can focus on your family while still progressing in your education.</li>
        <li><strong>Learners who have no idea how to handle certain parts of their assignments</strong>. If you understand your topic but struggle with specific parts like analysis, methodology, or referencing, it can slow down your progress and cause frustration. We can help you with any section, giving you a clear example to follow and making the difficult parts easier to understand.</li>
        <li><strong>Students who feel that they just need some rest for their mental well-being</strong>. If you are mentally exhausted, even starting an assignment can feel stressful. Constant pressure can affect your focus, and we can take care of your demanding writing tasks so you can rest and recover. Give yourself space to breathe, reduce academic pressure, and return to your studies with more energy.</li>
      </ul>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">College Paper Writing Service and Academic Integrity</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        Academic integrity is one of the most important demands that students get from their
        professors, and we often get questions concerning whether it is okay to use our services
        regarding this aspect. BoffinGlobal fully complies with academic integrity; we always produce
        writing tasks from scratch and provide you with 100% original works. Moreover, we always
        make sure our clients know how to pay for college essay and use our services properly. On
        our side, we can assure you that there are three rules that we follow no matter what.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">We never reuse papers</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We create every paper from scratch and never recycle or resell previous work. This way, we
        help you avoid risks and protect your academic record. Original work also ensures relevance
        to your specific instructions, giving you a reliable example to learn from.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">We offer plagiarism reports for everyone</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We provide detailed plagiarism reports, so you can feel this transparency and control. With
        such a report, you can make sure your work aligns with strict academic integrity standards.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">We never encourage our clients to hand in the received papers</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        We always provide our work as a study aid, never something you should submit as your own. We
        highly encourage responsible use because we believe that this approach empowers you to
        develop your own work while using our materials as guidance.
      </p>

      <h2 class="text-2xl md:text-[31px] font-bold text-[#424242] mb-6 mt-12">Pay for Essay: How College Students Save with BoffinGlobal</h2>
      <p class="text-[18px] text-[#424242] mb-4">
        Finances are one of the most important issues college students face today, and our primary
        task was to create a paper writing service where young adults can get assistance with their
        academic issues at affordable prices. Actually, we can’t say that we offer the lowest prices
        in the market, but still, we have organized some ways to help you get quality help and save
        some money without compromising the final result.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Order well in advance</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        If you place your “write my essay online” order early, writers have more time to work on it,
        which naturally lowers bids and reduces the overall cost. Urgent deadlines are always more
        expensive, so plan ahead.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Choose the most affordable bids</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        With the BoffinGlobal bidding system, you can compare experts and select the best online essay
        writer that fits your budget. Review their profiles and find qualified experts at lower
        rates without compromising quality.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Ask for partial assistance</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        Instead of ordering a full paper, you can place your “write my essays for me” request and
        get assistance with specific sections, be it an introduction, analysis, or conclusion. This
        will reduce the workload for your writer and lower the price.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Request editing</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        You can ask our experts to edit your own writing instead of creating a full piece. The
        writer will refine your draft as well as correct mistakes while preserving your original
        ideas and keeping the assistance within your budget.
      </p>
      <h3 class="variant-h3 text-[18px] font-bold text-[#424242] mb-2 mt-6">Use the power of our blog</h3>
      <p class="text-[18px] text-[#424242] mb-4">
        The blog our college essay writing service offers contains free academic tips, guides, and
        writing examples that can help you complete parts of your assignment independently. Use
        these resources and reduce the amount of paid assistance you need.
      </p>
    </div>
  </div>
</section>`;

let reactCode = rawHtml.replace(/class=/g, 'className=');

const componentStr = `import React from 'react';\n\nexport const InformationalProse = () => {\n  return (\n    ${reactCode}\n  );\n};\n`;

fs.writeFileSync('src/components/InformationalProse.tsx', componentStr);
console.log('Successfully wrote src/components/InformationalProse.tsx');
