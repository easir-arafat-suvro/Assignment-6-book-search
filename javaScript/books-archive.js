
// Grap input text, call loadData function & pass as parameter
const searchData = () => {
    const searchText = document.getElementById('input-field').value;
    document.getElementById('input-field').value = '';
    loadData(searchText);
}

// load data of related search
const loadData = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
}

// Display books
const displayBooks = books => {
    const bookCard = document.getElementById('book-card');
    bookCard.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="max-w-sm w-full lg:max-w-full lg:flex border border-gray-400">
        <div
            class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img class="mx-auto py-2 imgSize"
                src="https://covers.openlibrary.org/b/id/${book.cover_i !== undefined ? book.cover_i : ''}-M.jpg"
                alt="">
        </div>
        <div
            class=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
                <div class="text-gray-900 font-bold text-xl mb-2">${book.title}</div>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Id hic similique deleniti. Excepturi, blanditiis aspernatur! </p>
            </div>

            <div class="flex items-center">
                <div class="text-sm">
                    <p class="text-gray-900">Publishar : ${book.publisher !== undefined ? book.publisher[0] : ''}</p>
                    <p class="text-gray-900 leading-none">Author : ${book.author_name !== undefined ?
                book.author_name[0] : ''}</p>
                    <p class="text-gray-900">First PD : ${book.publish_date !== undefined ?
                book.publish_date[book.publish_date.length - 1] : ''}</p>
                </div>
            </div>

        </div>
    </div>
        `;
        bookCard.appendChild(div)
    });

    // Count Search results
    const resultsTag = document.getElementById('results');
    resultsTag.innerText = `${books.length !== 0 ? 'Total Results Found' + ' ' + books.length : 'No Result Found'
        }`
}