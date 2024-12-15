document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const campaignId = document.getElementById('campaignId').value.trim();
    const adTitle = document.getElementById('adTitle').value.trim();
    const terms = document.getElementById('terms').value.trim();

    if (!campaignId || !adTitle || !terms) {
        alert('Please fill out all required fields!');
        return;
    }

    let url = `{lpurl}?camp_id=${campaignId}&gclid={gclid}&placement={placement}&serplayout=slimrounded`;

    url += `&utm_content=${encodeURIComponent(adTitle)}`;

    if (terms) {
        const splitTerms = terms.split('\n').map(encodeURIComponent);
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
