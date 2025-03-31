document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let dictionary = [];

    fetch('/assets/data/dictionary.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load dictionary');
            return response.json();
        })
        .then(data => {
            dictionary = data;
            searchInput.focus();
        })
        .catch(error => {
            console.error('Error loading dictionary:', error);
            searchResults.innerHTML = '<p class="error">Failed to load dictionary. Please try again later.</p>';
        });

    const normalizeText = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const searchDictionary = query => {
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        const normalizedQuery = normalizeText(query);
        const results = dictionary.filter(entry => 
            normalizeText(entry.gaidhlig).includes(normalizedQuery) ||
            normalizeText(entry.gaeilge).includes(normalizedQuery) ||
            normalizeText(entry.gaelg).includes(normalizedQuery) ||
            normalizeText(entry.beurla).includes(normalizedQuery)
        );

        displayResults(results);
    };

    const displayResults = results => {
        if (results.length === 0) {
            searchResults.innerHTML = `<p class="no-results">${window.siteContent.search.no_results}</p>`;
            return;
        }

        searchResults.innerHTML = results.map(entry => `
            <div class="dictionary-entry">
                <div class="word">${entry.gaidhlig}</div>
                <div class="translations">
                    ${entry.gaeilge ? `
                        <div class="translation">
                            <span class="translation-label">${window.siteContent.translations.gaeilge}</span>
                            <span class="translation-value">${entry.gaeilge}</span>
                        </div>
                    ` : ''}
                    ${entry.gaelg ? `
                        <div class="translation">
                            <span class="translation-label">${window.siteContent.translations.gaelg}</span>
                            <span class="translation-value">${entry.gaelg}</span>
                        </div>
                    ` : ''}
                    ${entry.beurla ? `
                        <div class="translation">
                            <span class="translation-label">${window.siteContent.translations.beurla}</span>
                            <span class="translation-value">${entry.beurla}</span>
                        </div>
                    ` : ''}
                </div>
                ${entry.grammar ? `
                    <div class="grammar">
                        <span class="translation-label">${window.siteContent.translations.grammar}</span>
                        <span class="translation-value">${entry.grammar}</span>
                    </div>
                ` : ''}
                ${entry.definition ? `
                    <div class="definition">
                        <span class="translation-label">${window.siteContent.translations.definition}</span>
                        <span class="translation-value">${entry.definition}</span>
                    </div>
                ` : ''}
            </div>
        `).join('');
    };

    const clearButton = document.createElement('button');
    clearButton.className = 'clear-button';
    clearButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    `;
    clearButton.style.display = 'none';
    searchInput.parentNode.appendChild(clearButton);

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        searchDictionary('');
    });

    let debounceTimeout;
    searchInput.addEventListener('input', () => {
        clearButton.style.display = searchInput.value ? 'flex' : 'none';
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => searchDictionary(searchInput.value), 300);
    });

    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Escape' && searchInput.value) {
            searchInput.value = '';
            clearButton.style.display = 'none';
            searchDictionary('');
        }
    });
}); 