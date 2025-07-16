// script.js

document.addEventListener('DOMContentLoaded', () => {
    const linkItems = document.querySelectorAll('.link-item');

    linkItems.forEach(item => {
        const linkElement = item.querySelector('a');
        const imgElement = item.querySelector('.favicon');

        if (linkElement && imgElement) {
            const linkText = linkElement.textContent.trim(); // Get the text content of the <a> tag

            // Function to derive a "domain-like" string from the link text
            function getDomainFromText(text) {
                if (!text) return '';
                
                // Convert text to lowercase for case-insensitive matching
                const lowerText = text.toLowerCase();

                // Specific mappings for common social media platforms
                if (lowerText.includes('youtube')) {
                    return 'youtube.com';
                }
                if (lowerText.includes('instagram')) {
                    return 'instagram.com';
                }
                // Add more specific mappings here if needed, e.g.:
                // if (lowerText.includes('twitter') || lowerText.includes('x.com')) {
                //     return 'twitter.com';
                // }
                // if (lowerText.includes('linkedin')) {
                //     return 'linkedin.com';
                // }

                // Generic derivation for other cases (original logic)
                let domainPart = lowerText
                                   .replace(/\s+/g, '') // Remove all spaces
                                   .replace(/[^a-z0-9.]/g, '') // Keep only letters, numbers, and dots
                                   .replace(/^\.+|\.+$/g, ''); // Remove leading/trailing dots

                // If the text already contains a dot, assume it's a domain or part of one
                if (domainPart.includes('.')) {
                    return domainPart;
                }
                // For general cases, append .com if no dot is present
                return domainPart + '.com';
            }

            const domain = getDomainFromText(linkText);
            
            // Only set favicon source if a valid-looking domain was derived
            if (domain) {
                imgElement.src = `https://www.google.com/s2/favicons?domain=${domain}`;
                imgElement.alt = `${linkText} Favicon`; // Update alt text dynamically

                // Fallback for broken images if the domain derivation was incorrect
                imgElement.onerror = function() {
                    this.onerror = null; // Prevent infinite loop if fallback also fails
                    this.src = 'https://placehold.co/16x16/cccccc/333333?text=?'; // Generic placeholder
                };
            } else {
                // If no domain could be derived, show a generic placeholder immediately
                imgElement.src = 'https://placehold.co/16x16/cccccc/333333?text=?';
                imgElement.alt = "Generic Favicon";
            }
        }
    });
});