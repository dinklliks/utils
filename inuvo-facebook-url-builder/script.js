const encodeSpaces = (text) => {
    return text.split(' ').join(encodeURIComponent(' '));
};

document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const articleId = document.getElementById('articleId').value.trim();
    const campaignId = document.getElementById('campaignId').value.trim();
    const adTitle = document.getElementById('adTitle').value.trim();
    const terms = document.getElementById('terms').value.trim();
    const encodeTerms = true;
    const encodeAdTitle = true;

    if (!articleId || !campaignId || !adTitle || !terms) {
        alert('Please fill out all required fields!');
        return;
    }

    let url = `https://jumpsprints.com/article/${articleId.toUpperCase()}/?camp_id=${campaignId}`;

    const encodedAdTitle = encodeAdTitle ? encodeURIComponent(adTitle) : encodeSpaces(adTitle);
    url += `&utm_content=${encodedAdTitle}`;

    if (terms) {
        let splitTerms = terms.split('\n').map(term => term.trim().replace(/,+$/, '').trim());
        if (encodeTerms) {
            splitTerms = splitTerms.map(encodeURIComponent);
        } else {
            splitTerms = splitTerms.map(encodeSpaces);
        }
        url += `&utm_term=${splitTerms.join(',')}`
        // splitTerms.forEach((term, index) => url += `&kw${index+1}=${encodeURIComponent(term.trim())}`);
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
