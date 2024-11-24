const POST_ARTICLE_URL = 'https://dashboard-server.predicto.ai/api/keywords/upload';
const ACCESS_TOKEN = 'EXAMPLE';

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        keyword: getFormValue('keyword'),
        nativeKeyword: getFormValue('nativeKeyword'),
        language: getFormValue('language'),
        vertical: getFormValue('vertical'),
        suggestedKeywords: getFormValue('suggestedKeywords'),
        articleHeadline: getFormValue('articleHeadline'),
        articleExcerpt: getFormValue('articleExcerpt'),
        articleContent: getFormValue('articleContent'),
    };

    // if (
    //     !keyword ||
    //     !nativeKeyword ||
    //     !language ||
    //     !vertical ||
    //     !suggestedKeywords ||
    //     !articleHeadline ||
    //     !articleExcerpt ||
    //     !articleContent
    // ) {
    //     alert('Please fill out all required fields!');
    //     return;
    // }

    console.log(camelToSnakeCase(data));
    uploadArticle(data);
    //test

    // // Display the URL
    // const resultElement = document.getElementById('generatedUrl');
    // const resultContainer = document.getElementById('result');
    // resultElement.textContent = url;
    // resultElement.style.display = 'block';
    // resultContainer.style.display = 'block';
});

const uploadArticle = async (data) => {
    const submitButton = document.getElementById('submitButton');
    try {
        document.body.style.cursor = 'progress';
        submitButton.setAttribute('disabled', '');
        const response = await fetch(POST_ARTICLE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ACCESS_TOKEN,
            },
            body: JSON.stringify(data),
        });

        console.log('response', response);

        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            alert('Form submitted successfully!');
        } else {
            console.error('Error:', response.statusText);
            alert('Failed to submit the form.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }

    submitButton.removeAttribute('disabled');
    document.body.style.cursor = 'unset';
}


document.getElementById('form').addEventListener('reset', function(event) {
    const resultContainer = document.getElementById('result');
    resultContainer.style.display = 'none';
});

[
    ...document.querySelectorAll('input'),
    ...document.querySelectorAll('textarea')
]
    .forEach(input => {
    input.addEventListener('paste', (event) => {
        // Delay to ensure the pasted value registers
        setTimeout(() => {
            const formElements = Array.from(document.querySelectorAll('input, textarea'));
            const currentIndex = formElements.indexOf(event.target);
            const nextInput = formElements[currentIndex + 1];

            if (nextInput) {
                nextInput.focus();
            }
        }, 0);
    });
});

const getFormValue = (key) => {
    return document.getElementById(key).value.trim();
}

const camelToSnakeCase = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj; // Return non-object values as is
    }

    if (Array.isArray(obj)) {
        return obj.map(camelToSnakeCase);
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        acc[snakeKey] = camelToSnakeCase(value); // Recursively process nested values
        return acc;
    }, {});
}
