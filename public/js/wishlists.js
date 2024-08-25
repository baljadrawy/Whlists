document.addEventListener('DOMContentLoaded', function() {
    const userId = 'USER_ID'; // استبدل بـ ID المستخدم
    fetch(`/api/wishlist/${userId}`)
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
