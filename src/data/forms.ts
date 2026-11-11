import { professions, subjects } from './networks.ts';
// Questions for every guided form. One place, so a form can appear on its own page and inside a related page.
// Labels on the legal aid and contact forms are the documents' own words. Helper lines, examples and short names are interface copy.
export type FormField = {
  name: string; label: string; type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'; options?: string[]; required?: boolean;
  hint?: string; help?: string; ph?: string; short?: string;
};

export const legalAid: FormField[] = [
  { name: 'name', label: 'Full Name', short: 'Name', help: 'Your name, so we know who to speak to.', ph: 'For example: Muhammad Ahmed', required: true },
  { name: 'phone', label: 'Phone Number & WhatsApp', short: 'Phone', help: 'The number we can call or message you on. WhatsApp is fine.', ph: '03XX XXXXXXX', type: 'tel', required: true },
  { name: 'city', label: 'City/District', short: 'City', help: 'Where you live, so we can find a lawyer near you.', ph: 'For example: Rawalpindi', required: true },
  { name: 'income', label: 'Monthly Income Bracket', short: 'Income', help: 'Choose the one that fits. This only helps us see who needs free help most.', type: 'select', options: ['Under Rs. 30,000', 'Rs. 30k - 60k', 'Unemployed'], required: true },
  { name: 'category', label: 'Case Category', short: 'Type of case', help: 'Choose the one closest to your problem. If unsure, pick the nearest.', type: 'select', options: ['Criminal Defense', 'Domestic Abuse', 'Police Harassment', 'Civil Rights Violation'], required: true },
  { name: 'summary', label: 'Brief Case Summary', short: 'Your story', help: 'Tell us what happened in your own words. Short and simple is fine. Keep sensitive papers for the consultation.', ph: 'Write here...', type: 'textarea', required: true },
  { name: 'against', label: 'Opposing Party', short: 'Other side', help: 'Who is your problem with? For example a person, a department or the police. You can skip this.', ph: 'For example: a landlord' },
];

export const volunteer: FormField[] = [
  { name: 'name', label: 'What is your full name?', short: 'Name', help: 'So we know who to reply to.', ph: 'Your full name', required: true },
  { name: 'email', label: 'Which email can we reach you on?', short: 'Email', help: 'We will write to you here.', ph: 'name@example.com', type: 'email', required: true },
  { name: 'phone', label: 'Phone or WhatsApp?', short: 'Phone', help: 'Optional. Handy if you prefer a call.', ph: '03XX XXXXXXX', type: 'tel' },
  { name: 'city', label: 'Which city are you in?', short: 'City', help: 'Where you live, so we can place you near our teams.', ph: 'For example: Islamabad', required: true },
  { name: 'profession', label: 'What is your profession?', short: 'Profession', help: 'Choose the one that fits you best.', type: 'select', options: ['Lawyer', 'Doctor or nurse', 'Educator', 'Social worker', 'Student', 'Other skilled professional'], required: true },
  { name: 'hours', label: 'How many hours a month can you give?', short: 'Time', help: 'A rough idea is fine. You can change it later.', type: 'select', options: ['Up to 5', '5 to 10', '10 to 20', 'More than 20'] },
  { name: 'about', label: 'How would you like to help?', short: 'How', help: 'Tell us what you would like to do. A sentence or two is enough.', ph: 'Write here...', type: 'textarea' },
];

export const partner: FormField[] = [
  { name: 'org', label: 'What is your organisation called?', short: 'Organisation', help: 'The name of your business or organisation.', ph: 'Organisation name', required: true },
  { name: 'name', label: 'Who should we speak to?', short: 'Contact', help: 'The person we should speak to.', ph: 'Full name', required: true },
  { name: 'email', label: 'Which email can we reach you on?', short: 'Email', help: 'We will reply to this address.', ph: 'name@example.com', type: 'email', required: true },
  { name: 'phone', label: 'Phone?', short: 'Phone', help: 'Optional.', ph: '03XX XXXXXXX', type: 'tel' },
  { name: 'idea', label: 'What would you like to do together?', short: 'Your idea', help: 'Tell us in your own words what you would like to do with us.', ph: 'Write here...', type: 'textarea', required: true },
];

export const press: FormField[] = [
  { name: 'name', label: 'What is your name?', short: 'Name', ph: 'Your name', required: true },
  { name: 'outlet', label: 'Which outlet are you with?', short: 'Outlet', help: 'The newspaper, channel or site you write for.', required: true },
  { name: 'email', label: 'Which email can we reach you on?', short: 'Email', help: 'We will reply here.', ph: 'name@example.com', type: 'email', required: true },
  { name: 'deadline', label: 'Is there a deadline?', short: 'Deadline', help: 'Optional. Tell us if you are working to a time.', ph: 'For example: Friday 5 pm' },
  { name: 'ask', label: 'What do you need?', short: 'Request', help: 'Tell us what you need: an interview, facts or images.', ph: 'Write here...', type: 'textarea', required: true },
];

export const updates: FormField[] = [
  { name: 'email', label: 'Which email should we use?', short: 'Email', help: 'We will only write when there is real news.', ph: 'name@example.com', type: 'email', required: true },
  { name: 'name', label: 'And your name?', short: 'Name', help: 'Optional. So we can greet you properly.', ph: 'Your name' },
];

export const contact: FormField[] = [
      { name: 'name', label: 'Full Name', short: 'Name', help: 'So we know who to reply to.', ph: 'Your full name', required: true },
      { name: 'email', label: 'Email Address', short: 'Email', help: 'We will reply to this address.', ph: 'name@example.com', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', short: 'Phone', help: 'Only if you would like a call. You can skip this.', ph: '03XX XXXXXXX', type: 'tel' },
      { name: 'profession', label: 'Profession / Area of Expertise', short: 'Profession', help: 'Choose the one that fits you best.', type: 'select', options: professions, required: true },
      { name: 'subject', label: 'Subject', short: 'Subject', help: 'What is your message about?', type: 'select', options: subjects, required: true },
      { name: 'message', label: 'Message', short: 'Message', ph: 'Write here...', type: 'textarea', hint: 'Tell us how you would like to contribute your skills', required: true },
];
