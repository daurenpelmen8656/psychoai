        // ===== CHART INITIALIZATION =====
        function initMoodChart() {
            const ctx = document.getElementById('moodChart');
            if (!ctx) return;
            
            new Chart(ctx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Mood Score',
                        data: [6, 5, 7, 6, 8, 7, 8],
                        borderColor: '#4A6CF7',
                        backgroundColor: 'rgba(74, 108, 247, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#4A6CF7',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }, {
                        label: 'Energy Level',
                        data: [5, 4, 6, 7, 6, 8, 7],
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#14B8A6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 12,
                                padding: 16,
                                font: { size: 11, family: 'Inter' }
                            }
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 10,
                            ticks: {
                                stepSize: 2,
                                font: { size: 11, family: 'Inter' },
                                color: '#94A3B8'
                            },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                        },
                        x: {
                            ticks: {
                                font: { size: 11, family: 'Inter' },
                                color: '#94A3B8'
                            },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // ===== MODAL FUNCTIONS =====
        function showModal(type) {
            closeModals();
            const modal = document.getElementById(type + 'Modal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                // Focus first input
                setTimeout(() => {
                    const input = modal.querySelector('input');
                    if (input) input.focus();
                }, 300);
            }
        }

        function closeModals() {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
            document.body.style.overflow = '';
        }

        // Close modal on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) closeModals();
            });
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModals();
        });

        // ===== AUTH HANDLERS =====
        function handleRegister() {
            closeModals();
            showPage('dashboard');
        }

        function handleLogin() {
            closeModals();
            showPage('dashboard');
        }

        // ===== PAGE NAVIGATION =====
        function showPage(page) {
            if (page === 'dashboard') {
                closeModals();
                // Show a check-in modal first as demo
                setTimeout(() => showModal('checkin'), 500);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ===== MOBILE MENU =====
        function toggleMobileMenu() {
            const nav = document.getElementById('mobileNav');
            const icon = document.getElementById('menuIcon');
            nav.classList.toggle('show');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }

        function closeMobileMenu() {
            document.getElementById('mobileNav').classList.remove('show');
            const icon = document.getElementById('menuIcon');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }

        // ===== ACCESSIBILITY =====
        function toggleAccessPanel() {
            document.getElementById('accessPanel').classList.toggle('show');
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const toggle = document.getElementById('darkToggle');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-checked', toggle.classList.contains('active'));
        }

        function toggleLargeText() {
            document.body.classList.toggle('large-text');
            const toggle = document.getElementById('textToggle');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-checked', toggle.classList.contains('active'));
        }

        function toggleReduceMotion() {
            const toggle = document.getElementById('motionToggle');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-checked', toggle.classList.contains('active'));
            if (toggle.classList.contains('active')) {
                document.querySelectorAll('*').forEach(el => {
                    el.style.animationDuration = '0s';
                    el.style.transitionDuration = '0s';
                });
            } else {
                document.querySelectorAll('*').forEach(el => {
                    el.style.animationDuration = '';
                    el.style.transitionDuration = '';
                });
            }
        }

        // ===== TONE SELECTOR =====
        const toneResponses = {
            strict: `<strong>User:</strong> "I keep procrastinating on important tasks."<br><br><strong>MindBridge (Strict):</strong> "Let's address this directly. Procrastination often stems from fear of failure or perfectionism. Here's your action plan: First, identify the specific task you're avoiding. Second, break it into 15-minute blocks. Third, start the first block within the next hour. No excuses — your future self will thank you."`,
            soft: `<strong>User:</strong> "I keep procrastinating on important tasks."<br><br><strong>MindBridge (Soft):</strong> "I hear you, and please know that procrastination doesn't mean you're lazy or broken. It's often your mind's way of protecting you from overwhelm. Let's be gentle with ourselves here. Could you share which task feels the heaviest right now? We'll take it one small, comfortable step at a time. There's no rush. 💙"`,
            friendly: `<strong>User:</strong> "I keep procrastinating on important tasks."<br><br><strong>MindBridge (Friendly):</strong> "Oh, I totally get it — we've all been there! 😅 Here's the thing though: procrastination is usually not about being lazy. It's often about the task feeling too big or scary. So here's a trick that works great: pick the SMALLEST possible thing you can do on that task (like literally just opening the document) and do just that. Usually, once you start, the momentum kicks in! Want to try it together?"`
        };

        function selectTone(el, tone) {
            document.querySelectorAll('.tone-card').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            el.classList.add('active');
            el.setAttribute('aria-pressed', 'true');
            
            const responseEl = document.getElementById('toneResponse');
            responseEl.style.opacity = 0;
            setTimeout(() => {
                responseEl.innerHTML = toneResponses[tone];
                responseEl.style.opacity = 1;
            }, 200);
        }

        // ===== SITUATION ANALYSIS =====
        function fillExample() {
            document.getElementById('situationInput').value = "My coworker consistently takes credit for my ideas during team meetings. I've tried hinting about it, but nothing changes. I don't want to create workplace drama, but I feel undervalued and frustrated.";
            document.getElementById('situationInput').focus();
        }

        function analyzeSituation() {
            const input = document.getElementById('situationInput').value.trim();
            if (!input) {
                document.getElementById('situationInput').focus();
                return;
            }

            const result = document.getElementById('analysisResult');
            const text = document.getElementById('analysisText');
            const tags = document.getElementById('analysisTags');

            result.classList.remove('show');

            setTimeout(() => {
                text.innerHTML = `<strong>Cognitive Pattern Identified:</strong> You're experiencing a common workplace boundary issue combined with conflict avoidance tendencies. The frustration you feel is valid — it signals that your values of recognition and fairness are being violated.<br><br>
                <strong>Recommended Approach:</strong><br>
                1. <strong>Document your contributions</strong> — send pre-meeting emails summarizing your ideas to establish a paper trail.<br>
                2. <strong>Use direct attribution</strong> — in meetings, say "Building on the idea I shared earlier..."<br>
                3. <strong>Have a private conversation</strong> — use "I" statements: "I noticed that when I present ideas, they sometimes get attributed to others, and I want to ensure we both get proper credit."<br>
                4. <strong>Escalate if needed</strong> — if the pattern continues, involve your manager with documented evidence.<br><br>
                <em>This situation reflects assertiveness boundaries, not drama. Standing up for your work is healthy professional behavior.</em>`;

                tags.innerHTML = `
                    <span class="analysis-tag">Boundary Setting</span>
                    <span class="analysis-tag">Workplace Dynamics</span>
                    <span class="analysis-tag">Assertiveness</span>
                    <span class="analysis-tag">Self-Advocacy</span>
                    <span class="analysis-tag">Conflict Resolution</span>
                `;

                result.classList.add('show');
            }, 800);
        }

        // ===== CHARACTER SELECTION =====
        function selectCharacter(el) {
            document.querySelectorAll('.character-card').forEach(c => {
                c.style.borderColor = '';
                c.style.background = '';
            });
            el.style.borderColor = 'var(--primary)';
            el.style.background = 'var(--primary-light)';
        }

        // ===== MOOD SELECTION =====
        function selectMood(el, mood) {
            document.querySelectorAll('.mood-option').forEach(m => m.classList.remove('selected'));
            el.classList.add('selected');
        }

        function submitCheckin() {
            closeModals();
            // Show a brief success message
            const toast = document.createElement('div');
            toast.innerHTML = '<i class="fas fa-check-circle"></i> Check-in recorded! Your mood has been logged.';
            toast.style.cssText = `
                position: fixed; bottom: 80px; right: 24px; background: var(--success); color: white;
                padding: 14px 24px; border-radius: var(--radius); font-size: 0.9rem; font-weight: 500;
                box-shadow: var(--shadow-lg); z-index: 300; display: flex; align-items: center; gap: 10px;
                animation: slideUp 0.3s ease;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        // ===== SCROLL ANIMATIONS =====
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            elements.forEach(el => observer.observe(el));
        }

        // ===== SCROLL TO TOP =====
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.addEventListener('scroll', () => {
            const btn = document.getElementById('scrollTop');
            if (window.scrollY > 500) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ===== HEADER SCROLL EFFECT =====
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 10) {
                header.style.boxShadow = 'var(--shadow)';
            } else {
                header.style.boxShadow = 'none';
            }
        });

        // ===== INIT =====
        document.addEventListener('DOMContentLoaded', () => {
            initMoodChart();
            handleScrollAnimations();

            // Animate goal progress bars
            setTimeout(() => {
                document.querySelectorAll('.goal-progress-bar').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 1000);
        });

        // Close access panel on outside click
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('accessPanel');
            const toggle = document.querySelector('.accessibility-toggle');
            if (!panel.contains(e.target) && !toggle.contains(e.target)) {
                panel.classList.remove('show');
            }
        });
