document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/wishlist/USER_ID')
        .then(response => response.json())
        .then(data => {
            const wishlist = document.getElementById('wishlist');
            const ul = document.createElement('ul');
            data.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.title;
                ul.appendChild(li);
            });
            wishlist.appendChild(ul);
        })
        .catch(error => console.error('Error fetching wishlist:', error));
});
