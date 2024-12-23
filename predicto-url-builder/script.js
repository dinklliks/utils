const allowedStyleIds = [
    '8290047583',
    '1632776705',
    '9319694402',
    '8006612099',
    '5791550279',
    '8238594636',
    '4478467976',
    '5456589373',
    '8100103614',
    '3544685732',
];

document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const articleId = document.getElementById('articleId').value.trim();
    const channelId = document.getElementById('channelId').value.trim();
    const styleId = document.getElementById('styleId').value.trim();
    const search = document.getElementById('search').value.trim();
    const terms = document.getElementById('terms').value.trim();

    if (!articleId || !channelId || !styleId) {
        alert('Please fill out all required fields!');
        return;
    }

    if (!allowedStyleIds.includes(styleId)) {
        alert('Invalid style ID!');
        return;
    }

    if (!search && !terms) {
        alert('Missing search or terms.');
        return;
    }

    if (!channelId.startsWith('ch') || channelId.length < 7) {
        alert('Invalid channel id\nShould be like the following: ch11806');
        return;
    }

    // Generate the URL
    const channelIds = `ch11806+${channelId}`;
    const baseUrl = 'https://searchlabz.com';
    const defaultParams = 'utm_campaign={trackingField6}&utm_medium={trackingField1}&utm_source=fb&utm_content={trackingField3}&fb_pixel_id=925149148994930&fpcv=Purchase&adtext={trackingField9}&fbclid={external_id}';
    let url = `${baseUrl}/${encodeURIComponent(articleId)}/?${defaultParams}&cid=${channelIds}&stid=${encodeURIComponent(styleId)}`;

    if (search) {
        url+= `&search=${encodeURIComponent(search)}`;
    }

    if (terms) {
        const splitTerms = terms.split('\n').map(term => term.trim().replace(/,+$/, '').trim());
        url+= `&terms=${splitTerms.map(encodeURIComponent).join(',')}`;
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


// https://searchlabz.com/koko-poko/?
// utm_campaign={trackingField6}
// utm_medium={trackingField1}
// utm_source=fb
// utm_content={trackingField3}
// fb_pixel_id=925149148994930
// fpcv=Purchase
// adtext={trackingField9}
// fbclid={external_id}&cid=ch11806+ch32432
// stid=8238594636
// search=this%20is%20seach%20terms
// terms=term1%2Cterm2