const POST_ARTICLE_URL = 'https://dashboard-server.predicto.ai/api/search/keywords/upload/';
const ACCESS_TOKEN = 'VuZx1fXX4VS7DJsU462W1YuhI1aUNO';
const confirmDialog = document.getElementById('confirmDialog');

const submitButton = document.getElementById('submitButton');
submitButton.style.cursor = 'not-allowed';

document.getElementById('language').addEventListener('input', (event) => {
    const value = event.target?.value;
    if (value?.length > 3) {
        submitButton.style.cursor = 'unset';
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.style.cursor = 'not-allowed';
        submitButton.setAttribute('disabled', 'disabled');
    }
});

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    confirmDialog.showModal();
});

document.getElementById('cancelButton').addEventListener('click', function(event) {
    event.preventDefault();
    confirmDialog.close();
});

document.getElementById('confirmButton').addEventListener('click', function(event) {
    event.preventDefault();
    confirmDialog.close();

    const language = getFormValue('language');

    if (language?.length < 4) {
        alert(`Insert language name instead of language code. detected: ${language}`);
        return;
    }

    const data = {
        keyword: getFormValue('keyword'),
        nativeKeyword: getFormValue('nativeKeyword'),
        language,
        vertical: getFormValue('vertical'),
        suggestedKeywords: getFormValue('suggestedKeywords'),
        articleHeadline: getFormValue('articleHeadline'),
        articleExcerpt: getFormValue('articleExcerpt'),
        articleContent: getFormValue('articleContent'),
    };

    uploadArticle(camelToSnakeCase(data));
});

const uploadArticle = async (data) => {
    try {
        const formData = new FormData();
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('file', file, 'file.json');
        document.body.style.cursor = 'progress';
        submitButton.setAttribute('disabled', '');
        const response = await fetch(POST_ARTICLE_URL, {
            method: 'POST',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            body: formData,
        });

        console.log('response', response);

        if (response.ok) {
            showSnackbar();
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

const showSnackbar = () => {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}
