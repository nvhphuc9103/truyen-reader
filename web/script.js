let chapters = [];
let currentIndex = 0;

async function loadChapters() {
    const response = await fetch('chapters.json');
    chapters = await response.json();

    const select = document.getElementById('chapterSelect');

    chapters.forEach((chapter, index) => {
        const option = document.createElement('option');

        option.value = index;
        option.textContent = chapter.title;

        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        currentIndex = parseInt(e.target.value);
        showChapter(currentIndex);
    });

    // nhớ chương đang đọc
    const saved = localStorage.getItem('last_chapter');

    if (saved) {
        currentIndex = parseInt(saved);
    }

    showChapter(currentIndex);
}

function showChapter(index) {
    const chapter = chapters[index];

    document.getElementById('chapterTitle').textContent = chapter.title;
    document.getElementById('chapterContent').textContent = chapter.content;

    document.getElementById('chapterSelect').value = index;

    localStorage.setItem('last_chapter', index);

    window.scrollTo(0, 0);
}

function prevChapter() {
    if (currentIndex > 0) {
        currentIndex--;
        showChapter(currentIndex);
    }
}

function nextChapter() {
    if (currentIndex < chapters.length - 1) {
        currentIndex++;
        showChapter(currentIndex);
    }
}

loadChapters();