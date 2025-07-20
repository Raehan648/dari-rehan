document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const currentMessageSpan = document.getElementById('currentMessage');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const dimulaiButton = document.getElementById('dimulaiButton');
    const canvasContainer = document.getElementById('canvas-container');
    const loveCanvas = document.getElementById('loveCanvas');
    const ctx = loveCanvas.getContext('2d');
    
    // Membuat elemen untuk teks "I love you sayang" di atas canvas
    const canvasTextElement = document.createElement('div');
    canvasTextElement.id = 'canvas-text';
    canvasTextElement.textContent = 'I love you sayang ❤️';
    canvasTextElement.style.position = 'absolute'; // Penting agar bisa diposisikan di atas canvas
    canvasTextElement.style.display = 'none'; // Sembunyikan dulu
    body.appendChild(canvasTextElement);

    let messageIndex = 0;
    const messages = [
        "Tap dimana aja yaaa",
        "hallo ilaa ❤️",
        "aku mau ngomong sesuatu nih",
        "coba pencet",
        "pencet lagi",
        "ayo semangat mencetnya",
        "janji ini terakhir",
        "serius",
        "ini",
        "terakhir",
        "tapi bohong hehe yahaha hayyuk",
        "aku tau pasti kamu kesal",
        "hmm",
        "yaudah deh",
        "padahal",
        "aku cuma mau bilang",
        "kepasar beli terasi pulangnya makan kadal",
        "i love you ❤️",
        "bjiiiirrrlah",
        "mau gak balikan lagi sama aku?",
        "kalo nggak mau kamu gausah tap lagi^^",
        "kalo mau coba tap lagi",
        // Pesan terakhir sebelum tombol muncul
        "coba pencet tombol dibawah ini 👇"
    ];
    const totalMessages = messages.length;

    let isMusicStarted = false; // Flag untuk melacak apakah musik sudah dimulai

    // Mengatur volume awal musik
    backgroundMusic.volume = 0.4; // Sedikit lebih rendah agar tidak terlalu bising

    // Fungsi untuk membuat hati yang jatuh saat diklik (tetap ada)
    function createFallingHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = Math.random() * 20 + 10; // Ukuran hati acak (10-30px)
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.transform = `translate(-50%, -50%) rotate(-45deg)`;
        heart.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Fungsi untuk membuat hati yang melayang di background
    function createBackgroundHeart() {
        const heart = document.createElement('div');
        heart.classList.add('background-heart');
        const size = Math.random() * 50 + 20; // Ukuran hati acak (20-70px)
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`; // Posisi horizontal acak
        heart.style.animationDuration = `${Math.random() * 10 + 15}s`; // Durasi animasi acak
        heart.style.animationDelay = `-${Math.random() * 15}s`; // Mulai dari posisi acak dalam animasi
        document.body.appendChild(heart);

        // Hapus hati setelah animasinya selesai untuk mencegah penumpukan elemen
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Panggil createBackgroundHeart secara berkala
    setInterval(createBackgroundHeart, 1000); // Buat hati baru setiap 1 detik

    // Fungsi untuk memperbarui pesan
    function updateMessage() {
        if (messageIndex < totalMessages) {
            currentMessageSpan.textContent = messages[messageIndex];
            messageIndex++;
        } else {
            // Setelah semua pesan ditampilkan, tampilkan tombol
            currentMessageSpan.style.opacity = '0'; // Sembunyikan pesan dengan transisi
            setTimeout(() => {
                currentMessageSpan.style.display = 'none';
                dimulaiButton.style.display = 'block';
                // Tambahkan sedikit animasi ke tombol jika diinginkan
                dimulaiButton.style.transform = 'translateY(20px) scale(0.8)';
                setTimeout(() => {
                    dimulaiButton.style.transform = 'translateX(-50%) scale(1)';
                    dimulaiButton.style.opacity = '1';
                }, 50);
            }, 500); // Tunggu transisi opacity pesan selesai
        }
    }

    // Event listener untuk klik pada body
    body.addEventListener('click', (e) => {
        // Coba putar musik hanya sekali pada interaksi pertama
        if (!isMusicStarted) {
            backgroundMusic.play().then(() => {
                isMusicStarted = true;
                console.log("Music started playing.");
            }).catch(error => {
                console.error("Failed to play music:", error);
                // Pesan opsional jika autoplay diblokir
                // alert("Browser Anda memblokir musik otomatis. Mohon klik lagi untuk memutar musik.");
            });
        }

        // Buat hati yang jatuh di posisi klik (opsional, bisa dihapus jika tidak diinginkan)
        createFallingHeart(e.clientX, e.clientY);

        if (messageIndex <= totalMessages) { // Pastikan tidak melebihi indeks
            updateMessage();
        }
    });

    // Event listener untuk tombol "Dimulai aku"
    dimulaiButton.addEventListener('click', () => {
        dimulaiButton.style.display = 'none'; // Sembunyikan tombol
        currentMessageSpan.style.display = 'none'; // Pastikan pesan juga tersembunyi
        backgroundMusic.volume = 0.1; // Mengurangi volume musik agar tidak terlalu dominan

        canvasContainer.style.display = 'flex'; // Tampilkan container canvas
        canvasTextElement.style.display = 'block'; // Tampilkan teks "I love you sayang"

        // Set ukuran canvas dan posisi teks
        loveCanvas.width = window.innerWidth;
        loveCanvas.height = window.innerHeight;
        positionCanvasText();

        drawHeartAnimation(); // Mulai animasi hati di canvas

        // Tampilkan teks "I love you sayang" secara perlahan
        setTimeout(() => {
            canvasTextElement.style.opacity = '1';
        }, 500); // Beri sedikit jeda sebelum teks muncul
    });

    // Fungsi untuk memposisikan teks "I love you sayang" di atas canvas
    function positionCanvasText() {
        const centerX = loveCanvas.width / 2;
        const centerY = loveCanvas.height / 2;
        const baseSize = Math.min(loveCanvas.width, loveCanvas.height) * 0.3;
        canvasTextElement.style.left = `${centerX}px`;
        canvasTextElement.style.top = `${centerY + baseSize * 0.8}px`; // Posisi di bawah hati
        canvasTextElement.style.transform = 'translate(-50%, -50%)'; // Untuk penempatan tengah yang akurat
    }

    // Menyesuaikan ukuran canvas dan posisi teks saat jendela diubah ukurannya
    window.addEventListener('resize', () => {
        if (canvasContainer.style.display === 'flex') {
            loveCanvas.width = window.innerWidth;
            loveCanvas.height = window.innerHeight;
            positionCanvasText();
            drawHeartAnimation(); // Gambar ulang hati saat ukuran berubah
        }
    });

    // Bagian untuk animasi hati di canvas
    let animationFrameId; // Untuk menyimpan ID requestAnimationFrame agar bisa dibatalkan

    function drawHeartAnimation() {
        // Bersihkan canvas sebelum menggambar ulang
        ctx.clearRect(0, 0, loveCanvas.width, loveCanvas.height);

        const centerX = loveCanvas.width / 2;
        const centerY = loveCanvas.height / 2;
        const baseSize = Math.min(loveCanvas.width, loveCanvas.height) * 0.3; // Ukuran hati relatif

        const numLayers = 5; // Jumlah lapisan hati
        const maxOffset = baseSize * 0.05; // Offset maksimum untuk partikel (lebih kecil agar lebih rapi)

        // Variabel untuk animasi partikel
        let particleOffset = 0;
        const particleSpeed = 0.05; // Kecepatan animasi partikel

        function animateHeart(timestamp) {
            ctx.clearRect(0, 0, loveCanvas.width, loveCanvas.height);

            particleOffset += particleSpeed; // Update offset partikel
            if (particleOffset > Math.PI * 2) {
                particleOffset -= Math.PI * 2; // Reset setelah satu putaran
            }

            for (let layer = 0; layer < numLayers; layer++) {
                const currentSize = baseSize * (1 - layer / (numLayers * 1.5)); // Membuat lapisan lebih kecil
                ctx.beginPath(); // Mulai path baru untuk setiap lapisan

                // Gambar hati utama
                for (let angle = 0; angle <= Math.PI * 2; angle += 0.01) {
                    const x = 16 * Math.pow(Math.sin(angle), 3);
                    const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);

                    const currentX = centerX + (currentSize * x) / 20;
                    const currentY = centerY - (currentSize * y) / 20;

                    if (angle === 0) {
                        ctx.moveTo(currentX, currentY);
                    } else {
                        ctx.lineTo(currentX, currentY);
                    }
                }
                ctx.closePath(); // Tutup path hati
                ctx.strokeStyle = 'cyan'; // Warna garis hati
                ctx.lineWidth = 1.5; // Ketebalan garis sedikit lebih tebal
                ctx.stroke();

                // Tambahkan partikel kecil di sepanjang garis hati
                for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) { // Lebih jarang untuk partikel
                    const x = 16 * Math.pow(Math.sin(angle), 3);
                    const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);

                    // Posisi partikel dengan offset animasi
                    const particlePosX = centerX + (currentSize * x) / 20 + Math.cos(angle + particleOffset * layer) * maxOffset;
                    const particlePosY = centerY - (currentSize * y) / 20 + Math.sin(angle + particleOffset * layer) * maxOffset;

                    ctx.fillStyle = 'white'; // Warna partikel
                    ctx.beginPath();
                    ctx.arc(particlePosX, particlePosY, 1.5, 0, Math.PI * 2); // Ukuran partikel
                    ctx.fill();
                }
            }
            
            // Permintaan frame animasi berikutnya
            animationFrameId = requestAnimationFrame(animateHeart);
        }

        // Pastikan animasi sebelumnya dibatalkan jika ada
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(animateHeart); // Mulai animasi
    }
});