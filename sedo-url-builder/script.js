const allowedLanguages = [
    'Arabic ar',
    'Korean ko',
    'Bengali bn',
    'Latvian lv',
    'Bulgarian bg',
    'Lithuanian lt',
    'Catalan ca',
    'Malay ms',
    'Chinese zh',
    'Malayalam ml',
    'Croatian hr',
    'Marathi mr',
    'Czech cs',
    'Norwegian no',
    'Danish da',
    'Persian fa',
    'Dutch nl',
    'Polish pl',
    'English en',
    'Portuguese pt',
    'Estonian et',
    'Punjabi pa',
    'Filipino tl',
    'Romanian ro',
    'Finnish fi',
    'Russian ru',
    'French fr',
    'Serbian sr',
    'German de',
    'Slovak sk',
    'Greek el',
    'Slovenian sl',
    'Gujarati gu',
    'Spanish es',
    'Hebrew iw',
    'Swedish sv',
    'Hindi hi',
    'Tamil ta',
    'Hungarian hu',
    'Telugu te',
    'Icelandic is',
    'Thai th',
    'Indonesian id',
    'Turkish tr',
    'Italian it',
    'Ukrainian uk',
    'Japanese ja',
    'Urdu ur',
    'Kanada kn',
    'Vietnamese vi',
];

document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const dsp = document.getElementById('dsp').value.trim();
    const domain = document.getElementById('domain').value.trim();
    const keywordLanguage = document.getElementById('keywordLanguage').value.trim();
    const adTitle = document.getElementById('adTitle').value.trim();
    const terms = document.getElementById('terms').value.trim();

    if (!domain || !keywordLanguage || !adTitle || !dsp) {
        alert('Please fill out all required fields!');
        return;
    }

    if (!allowedLanguages.includes(keywordLanguage)) {
        alert('Invalid keyword language, please select from the suggested list');
        return;
    }

    // Generate the URL
    const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    const trackingField = dsp === 'pinterest' ? 'trackingField1' : 'trackingField2'
    const defaultParams = `sub1={external_id}&sub2={${trackingField}}`;
    let url = `${baseUrl}/?${defaultParams}`;

    url += `&kwhl=${encodeURIComponent(keywordLanguage.split(' ')[1])}`;
    url += `&network=${encodeURIComponent(dsp)}`;
    url += `&adtitle=${encodeURIComponent(adTitle)}`;

    if (terms) {
        const splitTerms = terms.split('\n').map(term => term.trim().replace(/,+$/, '').trim());
        splitTerms.forEach((term, index) => url += `&kw${index+1}=${encodeURIComponent(term)}`);
    }

    navigator.clipboard.writeText(url);

    // Display the URL
    const resultElement = document.getElementById('generatedUrl');
    const resultContainer = document.getElementById('result');
    resultElement.textContent = url;
    resultElement.style.display = 'block';
    resultContainer.style.display = 'block';
});


document.getElementById('urlForm').addEventListener('reset', function(event) {
    const resultContainer = document.getElementById('result');
    resultContainer.style.display = 'none';
});
