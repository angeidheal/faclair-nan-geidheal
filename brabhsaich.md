---
layout: page
title: Brabhsaich
---

# Brabhsaich

<div class="browse-container">
  <div id="dictionary-list" class="dictionary-list">
    <!-- Dictionary entries will be loaded here -->
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    fetch('/assets/data/dictionary.json')
      .then(response => response.json())
      .then(data => {
        const dictionaryList = document.getElementById('dictionary-list');
        data.forEach(entry => {
          const div = document.createElement('div');
          div.className = 'dictionary-entry';
          div.innerHTML = `
                <div class="entry-header">
                    <h3 class="word">${entry.gaidhlig}</h3>
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
          `;

          // Add click handler for toggle button
          const toggleButton = div.querySelector('.toggle-button');
          const entryContent = div.querySelector('.entry-content');
          const toggleIcon = div.querySelector('.toggle-icon');
          
          toggleButton.addEventListener('click', () => {
            entryContent.classList.toggle('collapsed');
            toggleIcon.textContent = entryContent.classList.contains('collapsed') ? '▶' : '▼';
          });

          dictionaryList.appendChild(div);
        });
      })
      .catch(error => console.error('Error loading dictionary:', error));
  });
</script> 