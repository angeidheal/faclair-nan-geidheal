document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
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

    const normalizeText = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const searchDictionary = query => {
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        const normalizedQuery = normalizeText(query.toLowerCase());
        const results = dictionary.filter(entry => {
            const searchableText = [entry.gaidhlig, entry.gaeilge, entry.gaelg, entry.beurla, entry.definition].join(' ');
            return normalizeText(searchableText.toLowerCase()).includes(normalizedQuery);
        });

        displayResults(results);
    };

    const displayResults = results => {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">No results found</p>';
            return;
        }

        const resultsHTML = results.map(entry => `
            <div class="dictionary-entry">
                <div class="entry-header">
                    <span class="word">${entry.gaidhlig}</span>
                    <button class="toggle-button" aria-label="Toggle entry details">
                        <span class="toggle-icon">▶</span>
                    </button>
                </div>
                <div class="entry-content collapsed">
                    ${entry.grammar ? `
                        <div class="grammar">
                            <span class="translation-label">Gràmar</span>
                            <span class="translation-value">${entry.grammar}</span>
                        </div>
                    ` : ''}
                    ${entry.definition ? `
                        <div class="definition">
                            <span class="translation-label">Mìneachadh</span>
                            <span class="translation-value">${entry.definition}</span>
                        </div>
                    ` : ''}
                    <div class="translations">
                        <div class="translation">
                            <span class="translation-label">Gaeilge</span>
                            <span class="translation-value">${entry.gaeilge || ''}</span>
                        </div>
                        <div class="translation">
                            <span class="translation-label">Gaelg</span>
                            <span class="translation-value">${entry.gaelg || ''}</span>
                        </div>
                        <div class="translation">
                            <span class="translation-label">Beurla</span>
                            <span class="translation-value">${entry.beurla || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;

        searchResults.querySelectorAll('.toggle-button').forEach(button => {
            button.addEventListener('click', () => {
                const entryContent = button.closest('.dictionary-entry').querySelector('.entry-content');
                const toggleIcon = button.querySelector('.toggle-icon');
                entryContent.classList.toggle('collapsed');
                toggleIcon.textContent = entryContent.classList.contains('collapsed') ? '▶' : '▼';
            });
        });
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