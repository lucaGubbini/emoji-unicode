document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.emoji').forEach(item => {
        item.addEventListener('click', (e) => {
            // Extracting the Unicode from the content style
            const computedStyle = window.getComputedStyle(item, '::before');
            const content = computedStyle.content;
            const unicode = content.codePointAt(1).toString(16).toUpperCase();
            const unicodeStr = `U+${unicode}`;

            // Copying the Unicode to clipboard
            navigator.clipboard.writeText(unicodeStr).then(() => {
                console.log(`Copied ${unicodeStr} to clipboard`);

                // Show feedback message
                showFeedback(e.target, 'Copied!');
            }).catch(err => {
                console.error('Failed to copy:', err);

                // Optionally show error feedback
                showFeedback(e.target, 'Failed to copy!');
            });
        });
    });
});

function showFeedback(target, message) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.position = 'absolute';
    feedback.style.left = `${target.offsetLeft + target.offsetWidth / 2}px`;
    feedback.style.top = `${target.offsetTop - 30}px`; // Adjust this value as needed
    feedback.style.background = 'black';
    feedback.style.color = 'white';
    feedback.style.padding = '5px 10px';
    feedback.style.borderRadius = '5px';
    feedback.style.fontSize = '14px';
    feedback.style.zIndex = '1000';
    document.body.appendChild(feedback);

    // Remove the feedback message after 2 seconds
    setTimeout(() => {
        document.body.removeChild(feedback);
    }, 1000);
}
