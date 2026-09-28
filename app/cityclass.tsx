"use client";

import { useEffect, useRef, useState } from "react";

type Lesson = {
  objectName: string;
  category: string;
  confidence: string;
  shortDescription: string;
  explanation: string;
  howItWorks: string;
  realWorldApplication: string;
  funFact: string;
  learningLevel: string;
  microChallenge: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
};

type JournalItem = Lesson & {
  id: string;
  date: string;
  score: number;
  image?: string;
};

const demoLesson: Lesson = {
  objectName: "Traffic Signal",
  category: "Civic Engineering",
  confidence: "high",
  shortDescription: "A traffic signal controls the movement of vehicles and pedestrians at an intersection.",
  explanation: "Traffic lights use a sequence of colored signals to communicate when road users should stop, prepare, or move. The timing is coordinated to reduce conflicts between different directions of traffic.",
  howItWorks: "A controller changes the lights through programmed phases. Sensors or preset timing can help decide when traffic gets a green signal, while pedestrian buttons may request a safe crossing phase.",
  realWorldApplication: "Traffic signals organize busy intersections, improve pedestrian safety, and help manage the flow of vehicles.",
  funFact: "Modern traffic systems can coordinate multiple intersections so that vehicles encounter a planned sequence of green lights.",
  learningLevel: "Beginner",
  microChallenge: {
    question: "What is the main purpose of a traffic signal?",
    options: ["Decorate the road", "Control traffic movement", "Measure temperature", "Charge vehicles"],
    correctAnswer: "Control traffic movement",
    explanation: "Traffic signals communicate right-of-way so vehicles and pedestrians can move through an intersection in an organized way."
  }
};
function generateId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

const translations = {
  English: {
    home: "Home",
    scan: "Scan",
    journal: "Journal",
    liveExample: "CityClass Live Example",
    trafficSignal: "Traffic Signal",
    trafficDescription:
  "A simple object becomes a lesson about civic engineering, control systems and safety. Some text here",
    microChallenge: "Micro Challenge",
    trafficQuestion: "Why do traffic lights use different colors?",

    aiPoweredLearning: "AI-powered learning • MVP",
    heroTitle: "The city is your classroom.",
    heroDescription:
      "See something interesting. Scan it. CityClass turns the world around you into a lesson and a challenge.",
    scanSomething: "Scan Something →",
    myLearningJournal: "My Learning Journal",
    learn: "Learn",
    challenge: "Challenge",

    howCityClassWorks: "How CityClass Works",
    worldBecomesClassroom:
      "The world around you becomes your classroom.",
    everydayLearning:
      "CityClass turns everyday things into interactive learning experiences.",

    findAndScan: "Find something interesting around you and take a photo.",
    aiAnalyzes: "AI analyzes what you see and creates a simple lesson.",
    testLearning:
      "Test what you just learned with a quick micro challenge.",
    saveDiscoveries:
      "Save your discoveries and revisit them in your Learning Journal.",

    remember: "Remember",
    scanTitle: "Try Scanning",
    learningEverywhere: "Learning is everywhere.",
    scanningDescription:
      "Point CityClass at something around you and discover the lesson hiding inside it.",

    plants: "Plants",
    vehicles: "Vehicles",
    roadSigns: "Road Signs",
    machines: "Machines",
    buildings: "Buildings",
    science: "Science",
    startExploring: "Start Exploring →",

    continueLearning: "Continue Learning",
    revisitDiscovery:
      "Revisit your latest discovery and keep building your knowledge.",

    poweredByAI: "Powered by AI",
    aiLearningTitle:
      "AI turns everyday objects into learning experiences.",
    aiLearningDescription:
      "CityClass uses image understanding to identify what you discover and generate an interactive lesson and challenge.",
    aiPowered: "AI-powered learning",

    discoverStep: "STEP 1 • DISCOVER",
    whatDiscover: "What do you want to discover?",
    takePhoto:
      "Take a photo of something interesting around you and turn it into a lesson.",
    signs: "Signs",
    startDiscovery: "Start your discovery",
    chooseImage:
      "Choose an image from your gallery or take a photo of something interesting around you.",
    selectedObject: "Selected object",
    imageReady: "Image ready",
    readyForLesson:
      "CityClass is ready to turn this into a lesson.",
    somethingWrong: "Something went wrong",
    couldntCreateLesson: "We couldn't create your lesson.",
    tryAgain: "Try Again",
    chooseAnotherImage: "Choose Another Image",
    creatingLesson: "Creating your personalized lesson",
    analyzingDiscovery:
      "CityClass is analyzing your discovery and building an interactive lesson for you.",
    analyzing: "Analyzing",
    generateInformation: "Generate Information",
    chooseFromGallery: "Choose from Gallery",
    takePhotoButton: "Take a Photo",

    yourDiscovery: "YOUR DISCOVERY",
    whatIsIt: "What is it?",
    howDoesItWork: "How does it work?",
    whyDoesItMatter: "Why does it matter?",
    didYouKnow: "Did you know?",
    readyToTest: "Ready to test what you learned?",
    answerQuestion:
      "Answer one quick question and earn XP for your Learning Journal.",
    takeChallenge: "Take the Challenge →",
    scanAnother: "Scan Another Thing",

    challengeStep: "STEP 3 • MICRO CHALLENGE",
    checkAnswer: "Check Answer →",
    correct: "Correct!",
    notQuite: "Not quite!",
    youGotIt: "You got it!",
    keepExploring: "Keep exploring!",
    discoveryComplete: "Discovery Complete!",
    discoverySaved:
      "You explored something new and added it to your Learning Journal.",
    xpEarned: "XP EARNED",
    viewJournal: "View My Learning Journal →",

    myLearning: "MY LEARNING",
    learningJournal: "Learning Journal",
    journalDescription:
      "A collection of the world you've learned from.",
    backToHome: "← Back to Home",
    totalXP: "TOTAL XP",
    discoveries: "DISCOVERIES",
    level: "LEVEL",
    yourProgress: "YOUR PROGRESS",
    todaysLearning: "TODAY'S LEARNING",
    keepExploringWorld: "Keep exploring your world.",
    everyDiscovery:
      "Every discovery adds to your knowledge and your Learning Journal.",
    lessons: "LESSONS",
    xpToNextLevel: "XP to next level",

    curiousExplorer: "Curious Explorer",
    discoverySeeker: "Discovery Seeker",
    knowledgeBuilder: "Knowledge Builder",
    cityExplorer: "City Explorer",
    worldLearner: "World Learner",

    journeyStartsHere: "YOUR JOURNEY STARTS HERE",
    journalWaiting: "Your Learning Journal is waiting.",
    journalEmptyDescription:
      "Scan something around you, discover how it works, complete the challenge, and your discovery will be saved here.",
    firstDiscovery: "Start Your First Discovery →",
    captureAroundYou: "Capture something around you",
    turnIntoLesson: "Turn it into a lesson",
    earnXP: "Earn XP",
    completeChallenge: "Complete the challenge",
    viewLesson: "View Lesson →",
    clearJournal: "Clear Learning Journal",
    clearJournalConfirm:
      "Are you sure you want to clear your entire Learning Journal?",

    backToJournal: "← Back to Journal",
    correctAnswer: "Correct Answer",
    learnedOn: "Learned on",

    footerTagline: "The city is your classroom.",
    footerText: "AI-powered learning • Built for Fund My Crazy 2026",

    errorChooseImage: "Choose an image first.",
    errorTryAgain:
      "The AI is taking longer than expected. Please try again.",
    errorUnavailable:
      "CityClass couldn't create the lesson right now. Please try again in a moment.",
    errorGeneric:
      "We couldn't create your lesson right now. Please try again."
  },

  Hindi: {
    home: "होम",
    scan: "स्कैन",
    journal: "जर्नल",
    liveExample: "सिटी क्लास का उदाहरण",
    trafficSignal: "ट्रैफिक सिग्नल",
    trafficDescription:
      "एक साधारण वस्तु नागरिक इंजीनियरिंग, नियंत्रण प्रणालियों और सड़क सुरक्षा का पाठ बन जाती है।",
    microChallenge: "माइक्रो चैलेंज",
    trafficQuestion: "ट्रैफिक लाइट अलग-अलग रंगों का उपयोग क्यों करती हैं?",

    aiPoweredLearning: "AI आधारित सीख • MVP",
    heroTitle: "शहर ही आपकी कक्षा है।",
    heroDescription:
      "कुछ दिलचस्प देखें। उसे स्कैन करें। CityClass आपके आसपास की दुनिया को एक पाठ और चुनौती में बदल देता है।",
    scanSomething: "कुछ स्कैन करें →",
    myLearningJournal: "मेरी लर्निंग जर्नल",
    learn: "सीखें",
    challenge: "चुनौती",

    howCityClassWorks: "CityClass कैसे काम करता है",
    worldBecomesClassroom:
      "आपके आसपास की दुनिया आपकी कक्षा बन जाती है।",
    everydayLearning:
      "CityClass रोज़मर्रा की चीज़ों को इंटरैक्टिव सीखने के अनुभवों में बदलता है।",

    findAndScan:
      "अपने आसपास कुछ दिलचस्प खोजें और उसकी तस्वीर लें।",
    aiAnalyzes:
      "AI आपकी तस्वीर का विश्लेषण करता है और एक सरल पाठ बनाता है।",
    testLearning:
      "एक छोटे माइक्रो चैलेंज से अभी सीखी बातों को परखें।",
    saveDiscoveries:
      "अपनी खोजों को सेव करें और उन्हें अपनी लर्निंग जर्नल में दोबारा देखें।",

    remember: "याद रखें",
    scanTitle: "स्कैन करके देखें",
    learningEverywhere: "सीखना हर जगह है।",
    scanningDescription:
      "CityClass को अपने आसपास की किसी चीज़ की ओर करें और उसमें छिपा पाठ खोजें।",

    plants: "पौधे",
    vehicles: "वाहन",
    roadSigns: "सड़क संकेत",
    machines: "मशीनें",
    buildings: "इमारतें",
    science: "विज्ञान",
    startExploring: "खोजना शुरू करें →",

    continueLearning: "सीखना जारी रखें",
    revisitDiscovery:
      "अपनी नवीनतम खोज को दोबारा देखें और अपना ज्ञान बढ़ाते रहें।",

    poweredByAI: "AI द्वारा संचालित",
    aiLearningTitle:
      "AI रोज़मर्रा की वस्तुओं को सीखने के अनुभवों में बदलता है।",
    aiLearningDescription:
      "CityClass इमेज को समझकर आपकी खोज की पहचान करता है और एक इंटरैक्टिव पाठ तथा चुनौती तैयार करता है।",
    aiPowered: "AI आधारित सीख",

    discoverStep: "चरण 1 • खोजें",
    whatDiscover: "आप क्या खोजना चाहते हैं?",
    takePhoto:
      "अपने आसपास किसी दिलचस्प चीज़ की तस्वीर लें और उसे एक पाठ में बदलें।",
    signs: "संकेत",
    startDiscovery: "अपनी खोज शुरू करें",
    chooseImage:
      "अपनी गैलरी से तस्वीर चुनें या किसी दिलचस्प चीज़ की फोटो लें।",
    selectedObject: "चयनित वस्तु",
    imageReady: "तस्वीर तैयार है",
    readyForLesson:
      "CityClass इसे एक पाठ में बदलने के लिए तैयार है।",
    somethingWrong: "कुछ गलत हो गया",
    couldntCreateLesson: "हम आपका पाठ नहीं बना सके।",
    tryAgain: "फिर कोशिश करें",
    chooseAnotherImage: "दूसरी तस्वीर चुनें",
    creatingLesson: "आपका व्यक्तिगत पाठ बनाया जा रहा है",
    analyzingDiscovery:
      "CityClass आपकी खोज का विश्लेषण करके आपके लिए एक इंटरैक्टिव पाठ बना रहा है।",
    analyzing: "विश्लेषण",
    generateInformation: "जानकारी तैयार करें",
    chooseFromGallery: "गैलरी से चुनें",
    takePhotoButton: "फोटो लें",

    yourDiscovery: "आपकी खोज",
    whatIsIt: "यह क्या है?",
    howDoesItWork: "यह कैसे काम करता है?",
    whyDoesItMatter: "यह महत्वपूर्ण क्यों है?",
    didYouKnow: "क्या आपको पता है?",
    readyToTest: "क्या आप अपनी सीख को परखने के लिए तैयार हैं?",
    answerQuestion:
      "एक छोटा सवाल हल करें और अपनी लर्निंग जर्नल के लिए XP कमाएँ।",
    takeChallenge: "चुनौती लें →",
    scanAnother: "एक और चीज़ स्कैन करें",

    challengeStep: "चरण 3 • माइक्रो चैलेंज",
    checkAnswer: "उत्तर जाँचें →",
    correct: "सही!",
    notQuite: "पूरी तरह सही नहीं!",
    youGotIt: "आपने सही उत्तर दिया!",
    keepExploring: "खोज जारी रखें!",
    discoveryComplete: "खोज पूरी हुई!",
    discoverySaved:
      "आपने कुछ नया सीखा और उसे अपनी लर्निंग जर्नल में जोड़ दिया।",
    xpEarned: "प्राप्त XP",
    viewJournal: "मेरी लर्निंग जर्नल देखें →",

    myLearning: "मेरी सीख",
    learningJournal: "लर्निंग जर्नल",
    journalDescription:
      "उन चीज़ों का संग्रह जिनसे आपने दुनिया के बारे में सीखा है।",
    backToHome: "← होम पर वापस जाएँ",
    totalXP: "कुल XP",
    discoveries: "खोजें",
    level: "स्तर",
    yourProgress: "आपकी प्रगति",
    todaysLearning: "आज की सीख",
    keepExploringWorld: "अपनी दुनिया को खोजना जारी रखें।",
    everyDiscovery:
      "हर खोज आपके ज्ञान और आपकी लर्निंग जर्नल में जुड़ती है।",
    lessons: "पाठ",
    xpToNextLevel: "अगले स्तर के लिए XP",

    curiousExplorer: "जिज्ञासु खोजकर्ता",
    discoverySeeker: "खोज के साधक",
    knowledgeBuilder: "ज्ञान निर्माता",
    cityExplorer: "शहर खोजकर्ता",
    worldLearner: "विश्व शिक्षार्थी",

    journeyStartsHere: "आपकी यात्रा यहाँ से शुरू होती है",
    journalWaiting: "आपकी लर्निंग जर्नल आपका इंतज़ार कर रही है।",
    journalEmptyDescription:
      "अपने आसपास कुछ स्कैन करें, जानें कि वह कैसे काम करता है, चुनौती पूरी करें और आपकी खोज यहाँ सेव हो जाएगी।",
    firstDiscovery: "अपनी पहली खोज शुरू करें →",
    captureAroundYou: "अपने आसपास कुछ कैप्चर करें",
    turnIntoLesson: "इसे एक पाठ में बदलें",
    earnXP: "XP कमाएँ",
    completeChallenge: "चुनौती पूरी करें",
    viewLesson: "पाठ देखें →",
    clearJournal: "लर्निंग जर्नल साफ़ करें",
    clearJournalConfirm:
      "क्या आप अपनी पूरी लर्निंग जर्नल साफ़ करना चाहते हैं?",

    backToJournal: "← जर्नल पर वापस जाएँ",
    correctAnswer: "सही उत्तर",
    learnedOn: "सीखा गया",

    footerTagline: "शहर ही आपकी कक्षा है।",
    footerText: "AI आधारित सीख • Fund My Crazy 2026 के लिए बनाया गया",

    errorChooseImage: "पहले एक तस्वीर चुनें।",
    errorTryAgain:
      "AI को अपेक्षा से अधिक समय लग रहा है। कृपया फिर कोशिश करें।",
    errorUnavailable:
      "CityClass अभी पाठ नहीं बना सका। कृपया थोड़ी देर बाद फिर कोशिश करें।",
    errorGeneric:
      "हम अभी आपका पाठ नहीं बना सके। कृपया फिर कोशिश करें।"
  },

  Marathi: {
    home: "होम",
    scan: "स्कॅन",
    journal: "जर्नल",
    liveExample: "CityClass उदाहरण",
    trafficSignal: "ट्रॅफिक सिग्नल",
    trafficDescription:
      "एक साधी वस्तू नागरी अभियांत्रिकी, नियंत्रण प्रणाली आणि रस्ता सुरक्षेचा धडा बनते.",
    microChallenge: "मायक्रो चॅलेंज",
    trafficQuestion: "ट्रॅफिक सिग्नलमध्ये वेगवेगळे रंग का वापरले जातात?",

    aiPoweredLearning: "AI आधारित शिक्षण • MVP",
    heroTitle: "शहर हीच तुमची वर्गखोली आहे.",
    heroDescription:
      "काहीतरी मनोरंजक पाहा. ते स्कॅन करा. CityClass तुमच्या आजूबाजूच्या जगाला धडा आणि आव्हानामध्ये बदलते.",
    scanSomething: "काहीतरी स्कॅन करा →",
    myLearningJournal: "माझे लर्निंग जर्नल",
    learn: "शिका",
    challenge: "आव्हान",

    howCityClassWorks: "CityClass कसे काम करते",
    worldBecomesClassroom:
      "तुमच्या आजूबाजूचे जग तुमची वर्गखोली बनते.",
    everydayLearning:
      "CityClass रोजच्या वस्तूंना इंटरॅक्टिव्ह शिक्षणाच्या अनुभवांमध्ये बदलते.",

    findAndScan:
      "तुमच्या आजूबाजूला काहीतरी मनोरंजक शोधा आणि त्याचा फोटो घ्या.",
    aiAnalyzes:
      "AI तुम्ही काय पाहत आहात याचे विश्लेषण करून एक सोपा धडा तयार करते.",
    testLearning:
      "एका छोट्या मायक्रो चॅलेंजद्वारे तुम्ही नुकतेच शिकलेले तपासा.",
    saveDiscoveries:
      "तुमच्या शोधांना सेव्ह करा आणि ते तुमच्या लर्निंग जर्नलमध्ये पुन्हा पाहा.",

    remember: "लक्षात ठेवा",
    scanTitle: "स्कॅन करून पाहा",
    learningEverywhere: "शिक्षण सर्वत्र आहे.",
    scanningDescription:
      "CityClass ला तुमच्या आजूबाजूच्या एखाद्या वस्तूकडे निर्देश करा आणि त्यामधील लपलेला धडा शोधा.",

    plants: "वनस्पती",
    vehicles: "वाहने",
    roadSigns: "रस्ता चिन्हे",
    machines: "मशिन्स",
    buildings: "इमारती",
    science: "विज्ञान",
    startExploring: "शोध सुरू करा →",

    continueLearning: "शिकणे सुरू ठेवा",
    revisitDiscovery:
      "तुमचा नवीनतम शोध पुन्हा पाहा आणि तुमचे ज्ञान वाढवत राहा.",

    poweredByAI: "AI द्वारे समर्थित",
    aiLearningTitle:
      "AI रोजच्या वस्तूंना शिकण्याच्या अनुभवांमध्ये बदलते.",
    aiLearningDescription:
      "CityClass प्रतिमा समजून तुम्ही शोधलेल्या वस्तूची ओळख करते आणि इंटरॅक्टिव्ह धडा व आव्हान तयार करते.",
    aiPowered: "AI आधारित शिक्षण",

    discoverStep: "पायरी 1 • शोधा",
    whatDiscover: "तुम्हाला काय शोधायचे आहे?",
    takePhoto:
      "तुमच्या आजूबाजूच्या एखाद्या मनोरंजक वस्तूचा फोटो घ्या आणि त्याला धड्यामध्ये बदला.",
    signs: "चिन्हे",
    startDiscovery: "तुमचा शोध सुरू करा",
    chooseImage:
      "तुमच्या गॅलरीमधून फोटो निवडा किंवा एखाद्या मनोरंजक वस्तूचा फोटो घ्या.",
    selectedObject: "निवडलेली वस्तू",
    imageReady: "फोटो तयार आहे",
    readyForLesson:
      "CityClass याला धड्यामध्ये बदलण्यासाठी तयार आहे.",
    somethingWrong: "काहीतरी चूक झाली",
    couldntCreateLesson: "आम्ही तुमचा धडा तयार करू शकलो नाही.",
    tryAgain: "पुन्हा प्रयत्न करा",
    chooseAnotherImage: "दुसरा फोटो निवडा",
    creatingLesson: "तुमचा वैयक्तिक धडा तयार होत आहे",
    analyzingDiscovery:
      "CityClass तुमच्या शोधाचे विश्लेषण करून तुमच्यासाठी इंटरॅक्टिव्ह धडा तयार करत आहे.",
    analyzing: "विश्लेषण",
    generateInformation: "माहिती तयार करा",
    chooseFromGallery: "गॅलरीमधून निवडा",
    takePhotoButton: "फोटो घ्या",

    yourDiscovery: "तुमचा शोध",
    whatIsIt: "हे काय आहे?",
    howDoesItWork: "हे कसे काम करते?",
    whyDoesItMatter: "हे महत्त्वाचे का आहे?",
    didYouKnow: "तुम्हाला माहिती आहे का?",
    readyToTest: "तुम्ही तुमचे शिकलेले तपासण्यासाठी तयार आहात का?",
    answerQuestion:
      "एक छोटा प्रश्न सोडवा आणि तुमच्या लर्निंग जर्नलसाठी XP मिळवा.",
    takeChallenge: "आव्हान घ्या →",
    scanAnother: "आणखी एक गोष्ट स्कॅन करा",

    challengeStep: "पायरी 3 • मायक्रो चॅलेंज",
    checkAnswer: "उत्तर तपासा →",
    correct: "बरोबर!",
    notQuite: "पूर्णपणे बरोबर नाही!",
    youGotIt: "तुमचे उत्तर बरोबर आहे!",
    keepExploring: "शोध सुरू ठेवा!",
    discoveryComplete: "शोध पूर्ण झाला!",
    discoverySaved:
      "तुम्ही काहीतरी नवीन शिकलात आणि ते तुमच्या लर्निंग जर्नलमध्ये जोडले.",
    xpEarned: "मिळवलेले XP",
    viewJournal: "माझे लर्निंग जर्नल पहा →",

    myLearning: "माझे शिक्षण",
    learningJournal: "लर्निंग जर्नल",
    journalDescription:
      "तुम्ही जगातून शिकलेल्या गोष्टींचा संग्रह.",
    backToHome: "← होमवर परत जा",
    totalXP: "एकूण XP",
    discoveries: "शोध",
    level: "स्तर",
    yourProgress: "तुमची प्रगती",
    todaysLearning: "आजचे शिक्षण",
    keepExploringWorld: "तुमचे जग शोधत राहा.",
    everyDiscovery:
      "प्रत्येक शोध तुमच्या ज्ञानात आणि लर्निंग जर्नलमध्ये भर घालतो.",
    lessons: "धडे",
    xpToNextLevel: "पुढील स्तरासाठी XP",

    curiousExplorer: "जिज्ञासू शोधक",
    discoverySeeker: "शोध घेणारा",
    knowledgeBuilder: "ज्ञान निर्माण करणारा",
    cityExplorer: "शहर शोधक",
    worldLearner: "विश्व शिक्षार्थी",

    journeyStartsHere: "तुमचा प्रवास इथून सुरू होतो",
    journalWaiting: "तुमचे लर्निंग जर्नल तुमची वाट पाहत आहे.",
    journalEmptyDescription:
      "तुमच्या आजूबाजूची एखादी वस्तू स्कॅन करा, ती कशी काम करते ते शिका, आव्हान पूर्ण करा आणि तुमचा शोध येथे सेव्ह केला जाईल.",
    firstDiscovery: "तुमचा पहिला शोध सुरू करा →",
    captureAroundYou: "तुमच्या आजूबाजूची वस्तू कॅप्चर करा",
    turnIntoLesson: "तिला धड्यामध्ये बदला",
    earnXP: "XP मिळवा",
    completeChallenge: "आव्हान पूर्ण करा",
    viewLesson: "धडा पहा →",
    clearJournal: "लर्निंग जर्नल साफ करा",
    clearJournalConfirm:
      "तुम्हाला तुमचे संपूर्ण लर्निंग जर्नल साफ करायचे आहे का?",

    backToJournal: "← जर्नलवर परत जा",
    correctAnswer: "बरोबर उत्तर",
    learnedOn: "शिकले",

    footerTagline: "शहर हीच तुमची वर्गखोली आहे.",
    footerText: "AI आधारित शिक्षण • Fund My Crazy 2026 साठी तयार केलेले",

    errorChooseImage: "प्रथम एक फोटो निवडा.",
    errorTryAgain:
      "AI ला अपेक्षेपेक्षा जास्त वेळ लागत आहे. कृपया पुन्हा प्रयत्न करा.",
    errorUnavailable:
      "CityClass आत्ता धडा तयार करू शकले नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
    errorGeneric:
      "आम्ही आत्ता तुमचा धडा तयार करू शकलो नाही. कृपया पुन्हा प्रयत्न करा."
  }
} as const;

function JournalInfo({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="card p-6">
      <h3 className="text-xl font-black text-[#10231c]">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-[#66756f]">
        {text}
      </p>
    </div>
  );
}
export default function CityClass() {
 const [view, setView] = useState<
  "home" | "scan" | "lesson" | "quiz" | "journal" | "journal-detail"
>("home");
const [language, setLanguage] = useState("English");
const t = translations[language as keyof typeof translations];
  const [image, setImage] = useState<string | null>(null);
  const [mime, setMime] = useState("image/jpeg");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [journal, setJournal] = useState<JournalItem[]>([]);
  const [selectedJournalItem, setSelectedJournalItem] =
  useState<JournalItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { setJournal(JSON.parse(localStorage.getItem("cityclass-journal") || "[]")); } catch {}
  }, []);

  const xp = journal.reduce((sum, x) => sum + x.score, 0);

  async function chooseImage(file?: File) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setError("Please select an image file.");
    return;
  }

  if (file.size > 15 * 1024 * 1024) {
    setError("Image must be smaller than 15 MB.");
    return;
  }

  setError("");

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      const maxSize = 1280;

      let width = img.width;
      let height = img.height;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError("Could not process the image.");
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      const compressedImage = canvas.toDataURL(
        "image/jpeg",
        0.7
      );

      setImage(compressedImage);
      setMime("image/jpeg");
    };

    img.onerror = () => {
      setError("Could not process this image.");
    };

    img.src = String(reader.result);
  };

  reader.onerror = () => {
    setError("Could not read this image.");
  };

  reader.readAsDataURL(file);
}

async function analyze() {
  if (!image) {
    setError("Choose an image first.");
    return;
  }

  setLoading(true);
  setError("");

  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 60000);

    try {
      const base64 = image.split(",")[1];

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
          mimeType: mime,
          language: language,
        }),
        signal: controller.signal,
      });

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok && data.lesson) {
        setLesson(data.lesson);
        setView("lesson");
        return;
      }

      const temporaryError =
        res.status === 429 ||
        res.status === 500 ||
        res.status === 502 ||
        res.status === 503 ||
        res.status === 504;

      if (temporaryError && attempt < maxAttempts) {
        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 1500)
        );

        continue;
      }

      throw new Error("AI_UNAVAILABLE");
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.name === "AbortError"
      ) {
        if (attempt < maxAttempts) {
          await new Promise((resolve) =>
            setTimeout(resolve, attempt * 1500)
          );

          continue;
        }

        setError(
          "The AI is taking longer than expected. Please try again."
        );

        return;
      }

      if (
        e instanceof Error &&
        e.message === "AI_UNAVAILABLE"
      ) {
        setError(
          "CityClass couldn't create the lesson right now. Please try again in a moment."
        );

        return;
      }

      if (attempt < maxAttempts) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.min(3000 * 2 ** (attempt - 1), 10000))
        );

        continue;
      }

      setError(
        "We couldn't create your lesson right now. Please try again."
      );

      return;
    } finally {
      clearTimeout(timeout);
       setLoading(false);
    }
  }

  setError(
    "We couldn't create your lesson right now. Please try again."
  );
} 

  function startQuiz() { setSelected(""); setSubmitted(false); setView("quiz"); }

  async function submitQuiz() {
    if (!lesson || !selected) return;
    setSubmitted(true);
    const correct = selected === lesson.microChallenge.correctAnswer;
    const item: JournalItem = {
      ...lesson,
      id: generateId(),
      date: new Date().toISOString(),
      score: correct ? 30 : 10,
      image: image || undefined
    };
    const next = [item, ...journal].slice(0, 10);
    setJournal(next);
    localStorage.setItem("cityclass-journal", JSON.stringify(next));
  }

 function reset() {
  setJournal([]);
  localStorage.removeItem("cityclass-journal");

  setImage(null);
  setLesson(null);
  setSelected("");
  setSubmitted(false);
  setView("home");
}

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[#dfe6e1] bg-[#f7f8f4]/90 backdrop-blur">
  <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4">

    {/* Logo */}
    <button
      onClick={() => setView("home")}
      className="shrink-0 text-lg font-black tracking-tight text-[#10231c] md:text-xl"
    >
      CITY<span className="text-[#1f7a5a]">CLASS</span>
    </button>
    <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="rounded-full border border-[#cfd9d3] bg-white px-3 py-2 text-sm font-semibold text-[#10231c] outline-none transition focus:border-[#1f7a5a] md:px-4"
  aria-label="Select language"
>
  <option value="English">🇬🇧 English</option>
  <option value="Hindi">🇮🇳 हिन्दी</option>
  <option value="Marathi">🇮🇳 मराठी</option>
</select>
    {/* Navigation */}
    <nav className="flex items-center gap-1.5 text-sm md:gap-2">
      <button
        onClick={() => setView("home")}
        className="rounded-full px-3 py-2 font-semibold text-[#66756f] transition hover:bg-white hover:text-[#10231c] md:px-4"
      >
       🏠 {t.home}
      </button>

      <button
        onClick={() => setView("scan")}
        className="rounded-full bg-[#10231c] px-3 py-2 font-bold text-white transition hover:-translate-y-0.5 hover:opacity-90 active:scale-95 md:px-4"
      >
        🔍 {t.scan}
      </button>

      <button
        onClick={() => setView("journal")}
        className="rounded-full px-3 py-2 font-semibold text-[#66756f] transition hover:bg-white hover:text-[#10231c] md:px-4"
      >
       📖 {t.journal}
      </button>
    </nav>

  </div>
</header>

     {view === "home" && (
      <>
  <section className="hero-grid min-h-[calc(100vh-73px)] px-5 py-10 md:py-16">
    <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="fade-up">

        <div className="inline-flex rounded-full bg-[#dff4e9] px-4 py-2 text-sm font-bold text-[#1f7a5a]">
          {t.aiPoweredLearning}
        </div>

        <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-[#10231c] md:text-7xl">
          {t.heroTitle}
        </h1>

       <p className="mt-6 max-w-xl text-lg leading-8 text-[#66756f] md:text-xl">
  {t.heroDescription}
</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setView("scan")}
            className="rounded-full bg-[#10231c] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:opacity-90 active:scale-95"
          >
          🔍 {t.scanSomething}
          </button>

          <button
            onClick={() => setView("journal")}
            className="rounded-full border border-[#cfd9d3] bg-white px-7 py-4 font-bold text-[#10231c] transition hover:-translate-y-1 active:scale-95"
          >
            📖 {t.myLearningJournal}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#66756f]">
          <span className="pill">📷 {t.scan}</span>
          <span className="pill">🧠 {t.learn}</span>
          <span className="pill">🎯 {t.challenge}</span>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="card fade-up overflow-hidden p-2 md:p-3">

        <div className="rounded-[24px] bg-[#10231c] p-7 text-white md:p-9">

          <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#b8d8c8]">
            {t.liveExample}
          </div>

          <div className="mt-8 text-5xl">
            🚦
          </div>

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            {t.trafficSignal}
          </h2>

          <p className="mt-4 text-base leading-7 text-[#d5e2dc]">
             {t.trafficDescription},
            control systems and safety.
          </p>

          <div className="mt-7 rounded-2xl bg-white/10 p-5">
            <div className="text-sm font-bold text-[#b8d8c8]">
              {t.microChallenge}
            </div>

            <p className="mt-2 font-bold leading-6">
              {t.trafficQuestion}
            </p>
          </div>

        </div>
      </div>

    </div>
 </section>
 

{/* HOW CITYCLASS WORKS */}
<section className="mx-auto max-w-6xl px-5 py-16 md:py-24">

  <div className="max-w-2xl">
    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
      {t.howCityClassWorks}
    </div>

    <h2 className="mt-3 text-4xl font-black tracking-tight text-[#10231c] md:text-5xl">
      {t.worldBecomesClassroom}
    </h2>

    <p className="mt-4 text-lg leading-8 text-[#66756f]">
      CityClass turns everyday things into interactive learning experiences.
    </p>
  </div>

  <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

    <div className="card p-6 transition hover:-translate-y-1">
      <div className="text-4xl">📷</div>

      <div className="mt-5 text-sm font-bold text-[#1f7a5a]">
        01
      </div>

      <h3 className="mt-2 text-xl font-black text-[#10231c]">
        {t.scan}
      </h3>

      <p className="mt-3 leading-7 text-[#66756f]">
        {t.findAndScan}
      </p>
    </div>

    <div className="card p-6 transition hover:-translate-y-1">
      <div className="text-4xl">🧠</div>

      <div className="mt-5 text-sm font-bold text-[#1f7a5a]">
        02
      </div>

      <h3 className="mt-2 text-xl font-black text-[#10231c]">
        {t.learn}
      </h3>

      <p className="mt-3 leading-7 text-[#66756f]">
        {t.aiAnalyzes}
      </p>
    </div>

    <div className="card p-6 transition hover:-translate-y-1">
      <div className="text-4xl">🎯</div>

      <div className="mt-5 text-sm font-bold text-[#1f7a5a]">
        03
      </div>

      <h3 className="mt-2 text-xl font-black text-[#10231c]">
        {t.challenge}
      </h3>

      <p className="mt-3 leading-7 text-[#66756f]">
        {t.testLearning}
      </p>
    </div>

    <div className="card p-6 transition hover:-translate-y-1">
      <div className="text-4xl">📖</div>

      <div className="mt-5 text-sm font-bold text-[#1f7a5a]">
        04
      </div>

      <h3 className="mt-2 text-xl font-black text-[#10231c]">
        {t.remember}
      </h3>

      <p className="mt-3 leading-7 text-[#66756f]">
        {t.saveDiscoveries}
      </p>
    </div>

  </div>

</section>


{/* TRY SCANNING */}
<section className="mx-auto max-w-6xl px-5 py-16 md:py-24">

  <div className="text-center">
    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
      {t.scanTitle}
    </div>

    <h2 className="mt-3 text-4xl font-black tracking-tight text-[#10231c] md:text-5xl">
      Learning is everywhere.
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#66756f]">
      Point CityClass at something around you and discover the lesson hiding inside it.
    </p>
  </div>

  <div className="mt-10 flex flex-wrap justify-center gap-3">

    <div className="rounded-full border border-[#dfe6e1] bg-white px-5 py-3 font-medium shadow-sm">
      🌱 Plants
    </div>

    <div className="rounded-full border border-[#dfe6e1] bg-white px-5 py-3 font-medium shadow-sm">
      🚗 Vehicles
    </div>

    <div className="rounded-full border border-[#dfe6e1] bg-white px-5 py-3 font-medium shadow-sm">
      🚦 Road Signs
    </div>

    <div className="rounded-full border border-[#dfe6e1] bg-white px-5 py-3 font-medium shadow-sm">
      ⚡ Machines
    </div>

    <div className="rounded-full border border-[#dfe6e1] bg-white px-5 py-3 font-medium shadow-sm">
      🏛️ Buildings
    </div>

    <div className="rounded-full border border-[#dfe6e1] bg-white px-5 py-3 font-medium shadow-sm">
      🔬 Science
    </div>

  </div>

  <div className="mt-10 flex justify-center">
    <button
      onClick={() => setView("scan")}
      className="rounded-full bg-[#10231c] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:opacity-90 active:scale-95"
    >
      🔍 Start Exploring →
    </button>
  </div>
{journal.length > 0 && (
  <div className="mx-auto mt-12 max-w-4xl">
    <div className="card overflow-hidden">
      <div className="grid md:grid-cols-[180px_1fr]">
        {journal[0].image ? (
          <img
            src={journal[0].image}
            alt={journal[0].objectName}
            className="h-48 w-full bg-[#f7f8f4] object-contain md:h-full"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-[#f7f8f4] text-5xl md:h-full">
            🔍
          </div>
        )}

        <div className="p-6 md:p-7">
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
            CONTINUE LEARNING
          </div>

          <h3 className="mt-2 text-2xl font-black text-[#10231c]">
            {journal[0].objectName}
          </h3>

          <p className="mt-2 leading-7 text-[#66756f]">
            Revisit your latest discovery and keep building your knowledge.
          </p>

          <button
            onClick={() => {
              setSelectedJournalItem(journal[0]);
              setView("journal-detail");
            }}
            className="mt-5 rounded-full bg-[#10231c] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:opacity-90 active:scale-95"
          >
            📖 Continue Learning →
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</section>
<section className="mx-auto max-w-6xl px-5 pb-20 pt-10">
  <div className="rounded-3xl border border-[#dfe6e1] bg-white p-6 md:p-8">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
          POWERED BY AI
        </div>

        <h2 className="mt-2 text-2xl font-black text-[#10231c] md:text-3xl">
          AI turns everyday objects into learning experiences.
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-[#66756f]">
          CityClass uses image understanding to identify what you
          discover and generate an interactive lesson and challenge.
        </p>
      </div>

      <div className="shrink-0 rounded-2xl bg-[#dff4e9] px-6 py-4 text-center">
        <div className="text-2xl">✨</div>
        <div className="mt-1 font-black text-[#1f7a5a]">
          Gemini AI
        </div>
        <div className="text-xs font-semibold text-[#66756f]">
          AI-powered learning
        </div>
      </div>
    </div>
  </div>
</section>
</>
)}


      {view === "scan" && (
        <section className="mx-auto max-w-4xl px-5 py-12">
<div className="mb-8">
  <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
    STEP 1 • DISCOVER
  </div>

  <h2 className="mt-2 text-4xl font-black tracking-tight text-[#10231c] md:text-5xl">
    What do you want to discover?
  </h2>

  <p className="mt-4 max-w-2xl text-lg leading-8 text-[#66756f]">
    Take a photo of something interesting around you and
    turn it into a lesson.
  </p>
<div className="mt-6 flex max-w-xl items-center gap-2">
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f7a5a] text-sm font-black text-white">
      1
    </span>
    <span className="hidden text-sm font-bold text-[#1f7a5a] sm:inline">
      Scan
    </span>
  </div>

  <div className="h-px flex-1 bg-[#cfd9d3]" />

  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8eee9] text-sm font-black text-[#66756f]">
      2
    </span>
    <span className="hidden text-sm font-bold text-[#66756f] sm:inline">
      Learn
    </span>
  </div>

  <div className="h-px flex-1 bg-[#cfd9d3]" />

  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8eee9] text-sm font-black text-[#66756f]">
      3
    </span>
    <span className="hidden text-sm font-bold text-[#66756f] sm:inline">
      Challenge
    </span>
  </div>
</div>
  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[#66756f]">
    <span className="pill">🌱 Plants</span>
    <span className="pill">🚗 Vehicles</span>
    <span className="pill">⚡ Machines</span>
    <span className="pill">🚦 Signs</span>
  </div>
</div>          
<div className="card overflow-hidden p-4 md:p-6">

  {image ? (
    <div className="overflow-hidden rounded-3xl bg-[#f7f8f4]">
      <img
        src={image}
        alt="Selected object"
        className="mx-auto max-h-[520px] w-full object-contain"
      />
    </div>
  ) : (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#cfd9d3] bg-[#f7f8f4] px-6 text-center md:min-h-[380px]">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dff4e9] text-4xl">
        📷
      </div>

      <h3 className="mt-6 text-2xl font-black text-[#10231c]">
        Start your discovery
      </h3>

      <p className="mt-3 max-w-md text-base leading-7 text-[#66756f]">
        Choose an image from your gallery or take a photo of something interesting around you.
      </p>
<div className="mt-6 flex flex-wrap justify-center gap-2">
  <span className="pill">🌱 Plants</span>
  <span className="pill">🚗 Vehicles</span>
  <span className="pill">🚦 Road Signs</span>
  <span className="pill">⚡ Machines</span>
  <span className="pill">🏛️ Buildings</span>
</div>
    </div>
  )}
 <input
  id="galleryInput"
  ref={fileRef}
  hidden
  type="file"
  accept="image/*"
  onChange={e => chooseImage(e.target.files?.[0])}
/>

<input
  id="cameraInput"
  hidden
  type="file"
  accept="image/*"
  capture="environment"
  onChange={e => chooseImage(e.target.files?.[0])}
/>
            {error && (
  <div className="mt-6 overflow-hidden rounded-3xl border border-red-100 bg-[#fff7f7]">
    <div className="p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl">
          ⚠️
        </div>

        <div className="flex-1">
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
            Something went wrong
          </div>

          <h3 className="mt-2 text-2xl font-black text-[#10231c]">
            We couldn't create your lesson.
          </h3>

          <p className="mt-2 leading-7 text-[#66756f]">
            We couldn't create your lesson right now. Please try again in a moment.
          </p>

         <div className="mt-5 flex flex-col gap-3 sm:flex-row">
  <button
    onClick={analyze}
    disabled={loading || !image}
    className="rounded-full bg-[#10231c] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
  >
    🔄 Try Again
  </button>

  <button
    onClick={() => {
      setError("");
      setImage(null);
      document.getElementById("galleryInput")?.click();
    }}
    className="rounded-full border border-[#cfd9d3] bg-white px-6 py-3 font-bold text-[#10231c] transition hover:-translate-y-1 hover:bg-[#f7f8f4]"
  >
    🖼️ Choose Another Image
  </button>
</div>
        </div>
      </div>
    </div>
  </div>
)}
           {loading ? (
  <div className="mt-6 overflow-hidden rounded-3xl bg-[#10231c] p-6 text-white md:p-8">
  <div className="flex flex-col items-center text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dff4e9]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1f7a5a] border-t-transparent" />
    </div>

    <div className="mt-5 text-2xl font-black">
      Creating your personalized lesson
    </div>

    <p className="mt-2 max-w-md leading-7 text-[#c8d8d1]">
      CityClass is analyzing your discovery and building an
      interactive lesson for you.
    </p>

    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#8fe0b8]">
      <span>🔍 Analyzing</span>
      <span>•</span>
      <span>🧠 Learning</span>
      <span>•</span>
      <span>🎯 Challenge</span>
    </div>
  </div>
</div>
) : (
  <div className="mt-6 grid gap-3 sm:grid-cols-2">

  <button
    onClick={() => fileRef.current?.click()}
    className="flex items-center justify-center gap-2 rounded-2xl bg-[#1f7a5a] px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:opacity-90 active:scale-[0.98]"
  >
    🖼️ Choose from Gallery
  </button>

  <button
    onClick={() =>
      document.getElementById("cameraInput")?.click()
    }
    className="flex items-center justify-center gap-2 rounded-2xl border border-[#cfd9d3] bg-white px-5 py-4 font-bold text-[#10231c] transition hover:-translate-y-1 active:scale-[0.98]"
  >
    📷 Take a Photo
  </button>
{image && !loading && (
  <div className="sm:col-span-2 rounded-2xl border border-[#bfe4ce] bg-[#f0faf5] px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dff4e9] text-[#1f7a5a]">
        ✓
      </div>

      <div>
        <div className="font-bold text-[#10231c]">
          Image ready
        </div>
        <div className="text-sm text-[#66756f]">
          CityClass is ready to turn this into a lesson.
        </div>
      </div>
    </div>
  </div>
)}
  {image && (
    <button
      onClick={analyze}
      disabled={loading || !image}
      className="flex items-center justify-center gap-2 rounded-2xl bg-[#10231c] px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:opacity-90 active:scale-[0.98] sm:col-span-2"
    >
      ✨ Generate Information
    </button>
  )}

</div>
)}
</div>
 </section>
      )}

      {view === "lesson" && lesson && (
        <section className="mx-auto max-w-4xl px-5 py-12 fade-up">
          <div className="flex flex-wrap items-center gap-2">
  <span className="pill bg-[#dff4e9] text-[#1f7a5a]">
    📚 {lesson.category}
  </span>

  <span className="pill">
    🎓 {lesson.learningLevel}
  </span>
</div>

<div className="mt-6">
  <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
    YOUR DISCOVERY
  </div>

  <h2 className="mt-2 text-4xl font-black leading-tight tracking-tight text-[#10231c] md:text-6xl">
    {lesson.objectName}
  </h2>

  <p className="mt-4 max-w-3xl text-lg leading-8 text-[#66756f] md:text-xl">
    {lesson.shortDescription}
  </p>
  <div className="mt-6 flex max-w-xl items-center gap-2">
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff4e9] text-sm font-black text-[#1f7a5a]">
      ✓
    </span>
    <span className="hidden text-sm font-bold text-[#1f7a5a] sm:inline">
      Scan
    </span>
  </div>

  <div className="h-px flex-1 bg-[#1f7a5a]" />

  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f7a5a] text-sm font-black text-white">
      2
    </span>
    <span className="hidden text-sm font-bold text-[#1f7a5a] sm:inline">
      Learn
    </span>
  </div>

  <div className="h-px flex-1 bg-[#cfd9d3]" />

  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8eee9] text-sm font-black text-[#66756f]">
      3
    </span>
    <span className="hidden text-sm font-bold text-[#66756f] sm:inline">
      Challenge
    </span>
  </div>
</div>
</div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">

  <div className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="text-3xl">🔍</div>
    <h3 className="mt-4 text-xl font-black text-[#10231c]">
      What is it?
    </h3>
    <p className="mt-3 leading-7 text-[#66756f]">
      {lesson.explanation}
    </p>
  </div>

  <div className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="text-3xl">⚙️</div>
    <h3 className="mt-4 text-xl font-black text-[#10231c]">
      How does it work?
    </h3>
    <p className="mt-3 leading-7 text-[#66756f]">
      {lesson.howItWorks}
    </p>
  </div>

  <div className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="text-3xl">🌍</div>
    <h3 className="mt-4 text-xl font-black text-[#10231c]">
      Why does it matter?
    </h3>
    <p className="mt-3 leading-7 text-[#66756f]">
      {lesson.realWorldApplication}
    </p>
  </div>

  <div className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="text-3xl">💡</div>
    <h3 className="mt-4 text-xl font-black text-[#10231c]">
      Did you know?
    </h3>
    <p className="mt-3 leading-7 text-[#66756f]">
      {lesson.funFact}
    </p>
  </div>

</div>
          <div className="mt-8 rounded-3xl bg-[#10231c] p-6 text-white md:p-8">
  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

    <div>
      <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#8fe0b8]">
        🧠 MICRO CHALLENGE
      </div>

      <h3 className="mt-2 text-2xl font-black md:text-3xl">
        Ready to test what you learned?
      </h3>

      <p className="mt-2 max-w-xl leading-7 text-[#c8d8d1]">
        Answer one quick question and earn XP for your Learning Journal.
      </p>
    </div>

    <button
      onClick={startQuiz}
      className="shrink-0 rounded-full bg-white px-7 py-4 font-black text-[#10231c] transition hover:-translate-y-1 hover:shadow-lg active:scale-95"
    >
      Take the Challenge →
    </button>

  </div>
</div>
<div className="mt-4 flex justify-center">
  <button
    onClick={() => {
      setImage(null);
      setLesson(null);
      setSelected("");
      setSubmitted(false);
      setError("");
      setView("scan");
    }}
    className="rounded-full border border-[#cfd9d3] bg-white px-6 py-3 font-bold text-[#10231c] transition hover:-translate-y-1 hover:bg-[#f7f8f4] active:scale-95"
  >
    📷 Scan Another Thing
  </button>
</div>
        </section>
      )}

      {view === "quiz" && lesson && (
        <section className="mx-auto max-w-3xl px-5 py-12 fade-up">
          <div className="flex items-center justify-between gap-4">
  <div>
    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a5a]">
      STEP 3 • MICRO CHALLENGE
    </div>
<div className="mt-6 flex max-w-xl items-center gap-2">
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff4e9] text-sm font-black text-[#1f7a5a]">
      ✓
    </span>
    <span className="hidden text-sm font-bold text-[#1f7a5a] sm:inline">
      Scan
    </span>
  </div>

  <div className="h-px flex-1 bg-[#1f7a5a]" />

  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff4e9] text-sm font-black text-[#1f7a5a]">
      ✓
    </span>
    <span className="hidden text-sm font-bold text-[#1f7a5a] sm:inline">
      Learn
    </span>
  </div>

  <div className="h-px flex-1 bg-[#1f7a5a]" />

  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f7a5a] text-sm font-black text-white">
      3
    </span>
    <span className="hidden text-sm font-bold text-[#1f7a5a] sm:inline">
      Challenge
    </span>
  </div>
</div>
    <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#10231c] md:text-4xl">
      {lesson.microChallenge.question}
    </h2>
  </div>

  <div className="hidden shrink-0 rounded-full bg-[#dff4e9] px-4 py-2 text-sm font-black text-[#1f7a5a] sm:block">
    +30 XP
  </div>
</div>
          <div className="mt-7 grid gap-4">
  {lesson.microChallenge.options.map((option, i) => {
    const correct =
      submitted &&
      option === lesson.microChallenge.correctAnswer;

    const wrong =
      submitted &&
      option === selected &&
      option !== lesson.microChallenge.correctAnswer;

    return (
      <button
        key={option}
        disabled={submitted}
        onClick={() => setSelected(option)}
        className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
          correct
            ? "border-[#1f7a5a] bg-[#dff4e9] shadow-md"
            : wrong
            ? "border-red-300 bg-red-50"
            : selected === option
            ? "border-[#1f7a5a] bg-[#f0faf5] shadow-md"
            : "border-[#dfe6e1] bg-white hover:-translate-y-0.5 hover:border-[#1f7a5a] hover:shadow-md"
        }`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-black ${
              correct
                ? "bg-[#1f7a5a] text-white"
                : wrong
                ? "bg-red-500 text-white"
                : selected === option
                ? "bg-[#1f7a5a] text-white"
                : "bg-[#dff4e9] text-[#1f7a5a]"
            }`}
          >
            {String.fromCharCode(65 + i)}
          </span>

          <span className="flex-1 font-semibold text-[#10231c]">
            {option}
          </span>

          {correct && (
            <span className="text-xl">✓</span>
          )}

          {wrong && (
            <span className="text-xl">✕</span>
          )}
        </div>
      </button>
    );
  })}
</div>
          {!submitted ? (
  <button
    disabled={!selected}
    onClick={submitQuiz}
    className="mt-7 w-full rounded-2xl bg-[#10231c] px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
  >
    Check Answer →
  </button>
) : (
  <div
    className={`mt-7 overflow-hidden rounded-3xl p-6 md:p-8 ${
      selected === lesson.microChallenge.correctAnswer
        ? "bg-[#dff4e9]"
        : "bg-[#fff1f1]"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl ${
          selected === lesson.microChallenge.correctAnswer
            ? "bg-[#1f7a5a] text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {selected === lesson.microChallenge.correctAnswer ? "✓" : "✕"}
      </div>

      <div className="flex-1">
        <div
          className={`text-sm font-bold uppercase tracking-[0.18em] ${
            selected === lesson.microChallenge.correctAnswer
              ? "text-[#1f7a5a]"
              : "text-red-600"
          }`}
        >
          {selected === lesson.microChallenge.correctAnswer
            ? "Correct!"
            : "Not quite!"}
        </div>

        <h3 className="mt-2 text-2xl font-black text-[#10231c]">
          {selected === lesson.microChallenge.correctAnswer
            ? "You got it!"
            : "Keep exploring!"}
        </h3>

        <p className="mt-3 leading-7 text-[#66756f]">
          {lesson.microChallenge.explanation}
        </p>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/70 p-4">
      <div className="mb-6 rounded-2xl bg-white/70 p-4 text-center">
  <div className="text-3xl">
    🎉
  </div>

  <div className="mt-2 text-lg font-black text-[#10231c]">
    Discovery Complete!
  </div>

  <p className="mt-1 text-sm text-[#66756f]">
    You explored something new and added it to your Learning Journal.
  </p>
</div>
      <div>
        <div className="text-sm font-bold text-[#66756f]">
          XP EARNED
        </div>

        <div className="mt-1 text-3xl font-black text-[#10231c]">
          +
          {selected === lesson.microChallenge.correctAnswer
            ? "30"
            : "10"}{" "}
          XP
        </div>
      </div>

      <div className="text-4xl">
        {selected === lesson.microChallenge.correctAnswer
          ? "⭐"
          : "💪"}
      </div>
    </div>

    <button
      onClick={() => setView("journal")}
      className="mt-6 w-full rounded-2xl bg-[#10231c] px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:opacity-90 active:scale-[0.98]"
    >
      📖 View My Learning Journal →
    </button>
    <button
  onClick={() => {
    setImage(null);
    setLesson(null);
    setSelected("");
    setSubmitted(false);
    setError("");
    setView("scan");
  }}
  className="mt-3 w-full rounded-2xl border border-[#cfd9d3] bg-white px-6 py-4 font-black text-[#10231c] transition hover:-translate-y-1 hover:bg-[#f7f8f4] active:scale-[0.98]"
>
  📷 Scan Another Thing
</button>
  </div>
)}
      </section>
)}

      {view === "journal" && (
  <section className="mx-auto max-w-5xl px-5 py-12 fade-up">
    
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <div className="text-sm font-bold text-[#1f7a5a]">
          MY LEARNING
        </div>

        <h2 className="mt-2 text-4xl font-black">
          Learning Journal
        </h2>

        <p className="mt-2 text-[#66756f]">
          A collection of the world you've learned from.
        </p>
        <div className="mt-5">
  <button
    onClick={() => setView("home")}
    className="rounded-full border border-[#cfd9d3] bg-white px-5 py-3 font-bold text-[#10231c] transition hover:-translate-y-0.5 hover:bg-[#f7f8f4] active:scale-95"
  >
    ← Back to Home
  </button>
</div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
  <div className="card p-5">
    <div className="text-sm font-bold text-[#66756f]">
      TOTAL XP
    </div>
    <div className="mt-2 text-3xl font-black text-[#10231c]">
      ⭐ {xp}
    </div>
  </div>

  <div className="card p-5">
    <div className="text-sm font-bold text-[#66756f]">
      DISCOVERIES
    </div>
    <div className="mt-2 text-3xl font-black text-[#10231c]">
      📚 {journal.length}
    </div>
  </div>

  <div className="card p-5">
    <div className="text-sm font-bold text-[#66756f]">
      LEVEL
    </div>
    <div className="mt-2">
  <div className="text-3xl font-black text-[#10231c]">
    🎓 Level {Math.floor(xp / 100) + 1}
  </div>

  <div className="mt-1 text-sm font-bold text-[#1f7a5a]">
    {Math.floor(xp / 100) + 1 === 1
      ? "🌱 Curious Explorer"
      : Math.floor(xp / 100) + 1 === 2
      ? "🔎 Discovery Seeker"
      : Math.floor(xp / 100) + 1 === 3
      ? "🧠 Knowledge Builder"
      : Math.floor(xp / 100) + 1 === 4
      ? "🚀 City Explorer"
      : "🌍 World Learner"}
  </div>
</div>
    <div className="mt-2 text-3xl font-black text-[#10231c]">
      🎓 {Math.floor(xp / 100) + 1}
    </div>
  </div>
</div>

<div className="mt-5 card p-5">
  <div className="flex items-center justify-between gap-4">
    <div>
      <div className="text-sm font-bold text-[#1f7a5a]">
        YOUR PROGRESS
      </div>
      <div className="mt-5 card overflow-hidden">
  <div className="bg-[#10231c] p-6 text-white md:p-7">
    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#8fe0b8]">
      TODAY'S LEARNING
    </div>

    <h3 className="mt-2 text-2xl font-black">
      Keep exploring your world.
    </h3>

    <p className="mt-2 text-sm leading-6 text-[#c8d8d1]">
      Every discovery adds to your knowledge and your Learning Journal.
    </p>
  </div>

  <div className="grid grid-cols-3 divide-x divide-[#e5ebe7] bg-white">
    <div className="p-4 text-center md:p-5">
      <div className="text-2xl">🌱</div>
      <div className="mt-2 text-2xl font-black text-[#10231c]">
        {journal.length}
      </div>
      <div className="mt-1 break-words text-[10px] font-bold leading-4 text-[#66756f] sm:text-xs">
        DISCOVERIES
      </div>
    </div>

    <div className="p-4 text-center md:p-5">
      <div className="text-2xl">⭐</div>
      <div className="mt-2 text-2xl font-black text-[#10231c]">
        {xp}
      </div>
      <div className="mt-1 break-words text-[10px] font-bold leading-4 text-[#66756f] sm:text-xs">
        XP EARNED
      </div>
    </div>

    <div className="p-4 text-center md:p-5">
      <div className="text-2xl">📚</div>
      <div className="mt-2 text-2xl font-black text-[#10231c]">
        {journal.length}
      </div>
      <div className="mt-1 break-words text-[10px] font-bold leading-4 text-[#66756f] sm:text-xs">
        LESSONS
      </div>
    </div>
  </div>
</div>
      <div className="mt-1 font-bold text-[#10231c]">
        {xp % 100} / 100 XP to next level
      </div>
    </div>

    <div className="text-2xl">
      🚀
    </div>
  </div>

  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e8eee9]">
    <div
      className="h-full rounded-full bg-[#1f7a5a] transition-all duration-500"
      style={{
        width: `${xp % 100}%`,
      }}
    />
  </div>
</div>
      </div>

      <div className="card px-5 py-4">
        <div className="text-xs text-[#66756f]">
          TOTAL XP
        </div>

        <div className="text-2xl font-black">
          {xp}
        </div>
      </div>
    </div>

   {journal.length === 0 ? (
  <div className="card mt-10 overflow-hidden">
    <div className="bg-[#10231c] px-6 py-10 text-center text-white md:px-10 md:py-14">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#dff4e9] text-4xl">
        📖
      </div>

      <div className="mx-auto mt-6 max-w-xl">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#8fe0b8]">
          YOUR JOURNEY STARTS HERE
        </div>

        <h3 className="mt-3 text-3xl font-black md:text-4xl">
          Your Learning Journal is waiting.
        </h3>

        <p className="mt-4 leading-7 text-[#c8d8d1]">
          Scan something around you, discover how it works, complete
          the challenge, and your discovery will be saved here.
        </p>

        <button
          onClick={() => setView("scan")}
          className="mt-7 rounded-full bg-white px-7 py-4 font-black text-[#10231c] transition hover:-translate-y-1 hover:shadow-lg active:scale-95"
        >
          🔍 Start Your First Discovery →
        </button>
      </div>
    </div>

    <div className="grid gap-4 bg-[#f7f8f4] p-5 sm:grid-cols-3">
      <div className="rounded-2xl bg-white p-5 text-center">
        <div className="text-2xl">📷</div>
        <div className="mt-2 font-black text-[#10231c]">
          Scan
        </div>
        <div className="mt-1 text-sm text-[#66756f]">
          Capture something around you
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 text-center">
        <div className="text-2xl">🧠</div>
        <div className="mt-2 font-black text-[#10231c]">
          Learn
        </div>
        <div className="mt-1 text-sm text-[#66756f]">
          Turn it into a lesson
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 text-center">
        <div className="text-2xl">⭐</div>
        <div className="mt-2 font-black text-[#10231c]">
          Earn XP
        </div>
        <div className="mt-1 text-sm text-[#66756f]">
          Complete the challenge
        </div>
      </div>
    </div>
  </div>
) : (
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        
        {journal.map((item) => (
         <button
  key={item.id}
  onClick={() => {
    setSelectedJournalItem(item);
    setView("journal-detail");
  }}
  className="group card w-full overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  {item.image ? (
    <div className="relative overflow-hidden bg-[#f7f8f4]">
      <img
        src={item.image}
        alt={item.objectName}
        className="h-56 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-sm font-black text-[#1f7a5a] shadow-md">
        +{item.score} XP
      </div>
    </div>
  ) : (
    <div className="flex h-56 items-center justify-center bg-[#f7f8f4] text-5xl">
      🔍
    </div>
  )}

  <div className="p-6">
    <div className="flex items-center justify-between gap-3">
      <span className="pill text-sm text-[#1f7a5a]">
        {item.category}
      </span>

      <span className="text-sm font-semibold text-[#8a9690]">
        {item.learningLevel}
      </span>
    </div>

    <h3 className="mt-4 text-2xl font-black text-[#10231c]">
      {item.objectName}
    </h3>

    <p className="mt-3 line-clamp-2 leading-6 text-[#66756f]">
      {item.shortDescription}
    </p>

    <div className="mt-5 flex items-center justify-between border-t border-[#e5ebe7] pt-4">
      <div className="text-sm text-[#8a9690]">
        {new Date(item.date).toLocaleDateString()}
      </div>

      <div className="font-bold text-[#1f7a5a] transition-transform duration-200 group-hover:translate-x-1">
        View Lesson →
      </div>
    </div>
  </div>
</button>
        ))}

      </div>
    )}
{journal.length > 0 && (
  <div className="mt-10 flex justify-center">
    <button
      onClick={() => {
        if (
          window.confirm(
            "Are you sure you want to clear your entire Learning Journal?"
          )
        ) {
          setJournal([]);
          localStorage.removeItem("cityclass-journal");
        }
      }}
      className="rounded-full border border-red-200 bg-white px-6 py-3 font-bold text-red-600 transition hover:bg-red-50"
    >
      🗑️ Clear Learning Journal
    </button>
  </div>
)}
  </section>
)}
{view === "journal-detail" && selectedJournalItem && (
  <section className="mx-auto max-w-4xl px-5 py-8 fade-up">

    <button
      onClick={() => setView("journal")}
      className="mb-6 rounded-full border border-[#cfd9d3] bg-white px-5 py-3 font-bold"
    >
      ← Back to Journal
    </button>

    {/* Full saved image */}
    {selectedJournalItem.image && (
      <div className="card overflow-hidden">
        <img
          src={selectedJournalItem.image}
          alt={selectedJournalItem.objectName}
          className="max-h-[600px] w-full object-contain bg-[#f7f8f4]"
        />
      </div>
    )}

    {/* Lesson heading */}
    <div className="mt-8">

      <div className="flex flex-wrap gap-2">

        <span className="pill text-[#1f7a5a]">
          {selectedJournalItem.category}
        </span>

        <span className="pill">
          {selectedJournalItem.learningLevel}
        </span>

        <span className="pill">
          +{selectedJournalItem.score} XP
        </span>

      </div>

      <h1 className="mt-5 text-4xl font-black md:text-5xl">
        {selectedJournalItem.objectName}
      </h1>

      <p className="mt-4 text-lg leading-8 text-[#66756f]">
        {selectedJournalItem.shortDescription}
      </p>

    </div>

    {/* Complete saved information */}
    <div className="mt-8 grid gap-4">

      <JournalInfo
        title="What is it?"
        text={selectedJournalItem.explanation}
      />

      <JournalInfo
        title="How does it work?"
        text={selectedJournalItem.howItWorks}
      />

      <JournalInfo
        title="Why does it matter?"
        text={selectedJournalItem.realWorldApplication}
      />

      <JournalInfo
        title="Did you know?"
        text={selectedJournalItem.funFact}
      />

    </div>

    {/* Saved challenge */}
    <div className="card mt-6 p-6">

      <div className="text-sm font-bold text-[#1f7a5a]">
        MICRO CHALLENGE
      </div>

      <h2 className="mt-3 text-2xl font-black">
        {selectedJournalItem.microChallenge.question}
      </h2>

      <div className="mt-5 grid gap-3">

        {selectedJournalItem.microChallenge.options.map(
          (option, index) => (
            <div
              key={option}
              className="rounded-2xl border border-[#dfe6e1] bg-white p-4"
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#dff4e9] font-bold text-[#1f7a5a]">
                {String.fromCharCode(65 + index)}
              </span>

              <span className="font-medium">
                {option}
              </span>
            </div>
          )
        )}

      </div>

      <div className="mt-6 rounded-2xl bg-[#dff4e9] p-5">

        <div className="font-bold text-[#1f7a5a]">
          Correct Answer
        </div>

        <div className="mt-2 font-black">
          {selectedJournalItem.microChallenge.correctAnswer}
        </div>

        <p className="mt-3 text-sm leading-6 text-[#66756f]">
          {selectedJournalItem.microChallenge.explanation}
        </p>

      </div>

    </div>

    <div className="mt-6 text-sm text-[#8a9690]">
      Learned on{" "}
      {new Date(selectedJournalItem.date).toLocaleString()}
    </div>

  </section>
)}
<footer className="border-t border-[#dfe6e1] bg-white">
  <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
    <div>
      <div className="text-lg font-black text-[#10231c]">
        CITY<span className="text-[#1f7a5a]">CLASS</span>
      </div>

      <p className="mt-1 text-sm text-[#66756f]">
        The city is your classroom.
      </p>
    </div>

    <div className="text-sm text-[#8a9690]">
      AI-powered learning • Built for Fund My Crazy 2026
    </div>
  </div>
</footer>
    </main>
   
  );
}

function Info({title, text}: {title: string; text: string}) {
  return <article className="card p-6"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-[#66756f]">{text}</p></article>;
}