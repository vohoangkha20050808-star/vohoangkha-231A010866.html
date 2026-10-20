// --- BÀI 1: TÌM KIẾM SẢN PHẨM ---
function initProductSearch() {
  const products = [
    { id: 1, name: "Laptop Gaming ASUS", price: "20.000.000 VNĐ" },
    { id: 2, name: "Điện thoại iPhone 15", price: "22.000.000 VNĐ" },
    { id: 3, name: "Tai nghe Bluetooth Sony", price: "2.500.000 VNĐ" },
    { id: 4, name: "Bàn phím cơ Keychron", price: "1.800.000 VNĐ" },
    { id: 5, name: "Màn hình Dell UltraSharp", price: "6.500.000 VNĐ" }
  ];

  const searchInput = document.getElementById('searchInput');
  const productGrid = document.getElementById('productGrid');

  if (!searchInput || !productGrid) return;

  function renderProducts(list) {
    productGrid.innerHTML = "";
    if (list.length === 0) {
      productGrid.innerHTML = `<div class="error-msg">Không tìm thấy sản phẩm phù hợp!</div>`;
      return;
    }
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      
      const title = document.createElement('h3');
      title.textContent = p.name; // Bảo mật chống XSS
      
      const price = document.createElement('p');
      price.textContent = p.price;
      
      card.appendChild(title);
      card.appendChild(price);
      productGrid.appendChild(card);
    });
  }

  renderProducts(products);

  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    renderProducts(filtered);
  });
}

// --- BÀI 2: FORM ĐĂNG KÝ & VALIDATE ---
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const msgBox = document.getElementById('formMsg');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) {
      showMsg(msgBox, "Email không hợp lệ!", "error");
      return;
    }

    if (!passwordRegex.test(password)) {
      showMsg(msgBox, "Mật khẩu phải từ 8 ký tự trở lên, bao gồm chữ hoa, chữ thường và số!", "error");
      return;
    }

    const userData = { name, email, registerDate: new Date().toISOString() };
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    showMsg(msgBox, "Đăng ký thành công! Dữ liệu đã lưu vào LocalStorage.", "success");
    form.reset();
  });

  function showMsg(element, text, type) {
    element.style.display = "block";
    element.textContent = text;
    element.className = `msg ${type}`;
  }
}

// --- BÀI 3: COUNTDOWN TIMER ---
function initCountdown() {
  const timerDisplay = document.getElementById('timerDisplay');
  const modal = document.getElementById('timeUpModal');
  if (!timerDisplay) return;

  let totalSeconds = 10 * 60; // 10 phút

  const intervalId = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(intervalId); // Tránh memory leak
      if (modal) modal.style.display = "flex";
      return;
    }

    totalSeconds--;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (totalSeconds < 60) {
      timerDisplay.classList.add('timer-warning');
    }
  }, 1000);
}

// --- BÀI 23: ĐÈN KÉO QUÂN 3D ---
function initCarousel() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  let angle = 0;
  let isPaused = false;

  function rotate() {
    if (!isPaused) {
      angle += 0.5;
      carousel.style.transform = `rotateY(${angle}deg)`;
    }
    requestAnimationFrame(rotate);
  }

  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  rotate();
}