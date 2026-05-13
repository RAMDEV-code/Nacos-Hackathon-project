// dummyData.js
// Mock data for NacosLasuLawBot to simulate backend/RAG responses

const DUMMY_DATA = {
    // Simulated typing options
    typingPhrases: [
        "What are the rights of a member under Article 12?",
        "How do I run for the office of the President?",
        "Can a member of the executive be impeached?",
        "What are the powers of the Congress?",
        "How are department funds allocated?"
    ],

    // Quick links data
    quickLinks: [
        {
            title: "What are my rights?",
            desc: "Learn about your fundamental rights as a NACOSite.",
            icon: "fa-solid fa-scale-balanced",
            prompt: "What are my rights as a member of NACOS-LASU?"
        },
        {
            title: "Running for Office",
            desc: "Requirements and eligibility for executive positions.",
            icon: "fa-solid fa-award",
            prompt: "What are the requirements to run for the office of the President?"
        },
        {
            title: "Congress Powers",
            desc: "Understand the legislative arm and their duties.",
            icon: "fa-solid fa-gavel",
            prompt: "What is the Congress and what are its powers?"
        },
        {
            title: "Financial Guidelines",
            desc: "How funds are managed and distributed.",
            icon: "fa-solid fa-coins",
            prompt: "How are the departmental funds shared and managed?"
        },
        {
            title: "Impeachment Process",
            desc: "How an officer can be removed from office.",
            icon: "fa-solid fa-ban",
            prompt: "How can an executive officer be removed or impeached?"
        },
        {
            title: "Amendments",
            desc: "The process of changing the constitution.",
            icon: "fa-solid fa-file-pen",
            prompt: "How do I amend the constitution?"
        }
    ],

    // Constitution Explorer dummy articles
    articles: [
        {
            id: "art-1",
            title: "Article 1: Supremacy of the Constitution",
            tag: "Rights",
            content: "This Constitution is supreme and its provisions shall have binding force on all authorities and persons throughout the National Association of Computer Science Students (NACOS), Lagos State University Chapter."
        },
        {
            id: "art-12",
            title: "Article 12: Rights of Members",
            tag: "Rights",
            content: "Every registered member shall have the right to:<br>1. Vote and be voted for, provided they meet the academic and moral requirements.<br>2. Attend all general congress meetings.<br>3. Access the financial records of the association through the Audit Committee.<br>4. Freedom of expression at all NACOS gatherings."
        },
        {
            id: "art-14",
            title: "Article 14: Elections and Eligibility",
            tag: "Elections",
            content: "To be eligible for the office of the President, a candidate must:<br>1. Be a registered student of the Department of Computer Science.<br>2. Be at least in their 300 Level of study.<br>3. Have a minimum CGPA of 3.0.<br>4. Must not have been found guilty of any misconduct by the University Disciplinary Committee."
        },
        {
            id: "art-18",
            title: "Article 18: The Congress",
            tag: "Congress",
            content: "The Congress shall be the highest decision-making body of the Association. It shall have the power to:<br>1. Approve the budget.<br>2. Impeach any erring executive member.<br>3. Amend the constitution."
        },
        {
            id: "art-22",
            title: "Article 22: Financial Provisions",
            tag: "Finance",
            content: "The funds of the association shall be generated through:<br>1. Annual dues paid by members.<br>2. Donations and grants.<br>3. Proceeds from departmental activities.<br>All expenditures must be approved by the Congress."
        }
    ],

    // Simulated RAG Responses based on keywords
    responses: {
        "rights": {
            text: "According to the NACOS-LASU Constitution, every registered member has several fundamental rights. These include the right to vote and be voted for (provided eligibility criteria are met), the right to attend all general congress meetings, and the right to freedom of expression at NACOS gatherings.",
            citation: {
                article: "Article 12, Section 1-4",
                source: "NACOS-LASU Constitution 2024"
            }
        },
        "president": {
            text: "To run for the office of the President, you must meet strict eligibility criteria. You must be a registered student of the Department, be at least in your 300 Level of study, and maintain a minimum CGPA of 3.0. Furthermore, you must have a clean disciplinary record.",
            citation: {
                article: "Article 14, Section 2(a-d)",
                source: "Electoral Guidelines & Constitution"
            }
        },
        "funds": {
            text: "Departmental funds are generated through annual dues, donations, and event proceeds. All expenditures must follow strict financial guidelines and require approval from the Congress before disbursement by the Financial Secretary and President.",
            citation: {
                article: "Article 22",
                source: "Financial Provisions"
            }
        },
        "impeach": {
            text: "An executive officer can be removed from office if found guilty of gross misconduct, financial misappropriation, or abuse of office. The process requires a petition signed by at least 2/3 of the Congress members, followed by an investigative committee report.",
            citation: {
                article: "Article 18, Section 5",
                source: "Disciplinary Measures"
            }
        },
        "congress": {
            text: "The Congress is the highest decision-making body of NACOS-LASU. It possesses the power to approve the annual budget, review executive actions, impeach erring officers, and amend the constitution.",
            citation: {
                article: "Article 18, Section 1",
                source: "Legislative Powers"
            }
        },
        "amend": {
            text: "Amending the constitution requires a formal written proposal submitted to the Congress. The amendment must be debated and passed by a 2/3 majority vote of the registered members present at a specially convened constitutional review meeting.",
            citation: {
                article: "Article 30",
                source: "Constitutional Amendments"
            }
        },
        "default": {
            text: "Based on my analysis of the NACOS-LASU constitution and standing orders, I found relevant information regarding your query. However, for a more specific answer, please try rephrasing your question to mention specific keywords like 'rights', 'elections', 'funds', or 'congress'.",
            citation: {
                article: "General Knowledge Base",
                source: "NACOS-LASU LawBot RAG Engine"
            }
        }
    }
};

// Make it available globally
window.DUMMY_DATA = DUMMY_DATA;
