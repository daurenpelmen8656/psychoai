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

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModals();
        });

        // ===== SUPABASE INITIALIZATION =====
        const SUPABASE_URL = 'https://zzfzkykgrvsleabnqkuq.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_46WT_deH7BGTp-3OHGSj2w_JyeDYNKm';
        let sbClient = null;

        try {
            if (typeof supabase !== 'undefined' && supabase.createClient) {
                sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                console.log('✅ Supabase client initialized');
            }
        } catch (err) {
            console.error('❌ Supabase init failed:', err);
        }

        // ===== AUTH STATUS HELPERS =====
        function showAuthStatus(elementId, message, type) {
            const el = document.getElementById(elementId);
            if (!el) return;
            el.style.display = 'block';
            el.textContent = message;
            if (type === 'error') {
                el.style.background = 'rgba(239,68,68,0.1)';
                el.style.color = '#EF4444';
                el.style.border = '1px solid rgba(239,68,68,0.2)';
            } else if (type === 'success') {
                el.style.background = 'rgba(16,185,129,0.1)';
                el.style.color = '#10B981';
                el.style.border = '1px solid rgba(16,185,129,0.2)';
            } else {
                el.style.background = 'rgba(74,108,247,0.1)';
                el.style.color = '#4A6CF7';
                el.style.border = '1px solid rgba(74,108,247,0.2)';
            }
        }

        function hideAuthStatus(elementId) {
            const el = document.getElementById(elementId);
            if (el) el.style.display = 'none';
        }

        function setButtonLoading(btnId, loading) {
            const btn = document.getElementById(btnId);
            if (!btn) return;
            if (loading) {
                btn.dataset.originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait…';
                btn.disabled = true;
                btn.style.opacity = '0.7';
            } else {
                btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        }

        // ===== AUTH HANDLERS =====
        async function handleRegister() {
            const username = document.getElementById('regUsername').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;

            hideAuthStatus('registerStatus');

            // Validation
            if (!username || username.length < 2) {
                showAuthStatus('registerStatus', '⚠️ Username must be at least 2 characters', 'error');
                return;
            }
            if (!password || password.length < 6) {
                showAuthStatus('registerStatus', '⚠️ Password must be at least 6 characters', 'error');
                return;
            }

            if (!sbClient) {
                showAuthStatus('registerStatus', '❌ Connection error — please refresh the page', 'error');
                return;
            }

            setButtonLoading('registerBtn', true);
            showAuthStatus('registerStatus', '⏳ Creating your account…', 'info');

            try {
                // Use email for Supabase Auth, or generate one from username
                const authEmail = email || (username.toLowerCase().replace(/[^a-z0-9]/g, '') + '@mindbridge.local');

                const { data, error } = await sbClient.auth.signUp({
                    email: authEmail,
                    password: password,
                    options: {
                        data: {
                            username: username,
                            display_name: username,
                        }
                    }
                });

                if (error) {
                    console.error('Registration error:', error);
                    let msg = error.message;
                    if (msg.includes('already registered')) {
                        msg = 'This email is already registered. Try logging in instead.';
                    } else if (msg.includes('valid email')) {
                        msg = 'Please enter a valid email address.';
                    } else if (msg.includes('password')) {
                        msg = 'Password must be at least 6 characters long.';
                    }
                    showAuthStatus('registerStatus', '❌ ' + msg, 'error');
                    setButtonLoading('registerBtn', false);
                    return;
                }

                // Also save to users table for the app to use
                try {
                    const { data: userData } = await sbClient.from('users').insert([{
                        name: username,
                        language: 'en',
                        goal: '',
                        therapist: '',
                    }]).select();

                    if (userData && userData.length > 0) {
                        localStorage.setItem('mb_user_id', userData[0].id);
                    }
                } catch (e) {
                    console.warn('Could not save to users table:', e);
                }

                // Save user info
                localStorage.setItem('mb_user', JSON.stringify({
                    name: username,
                    email: authEmail,
                    lang: 'en',
                    goal: '',
                    therapist: '',
                }));

                showAuthStatus('registerStatus', '✅ Account created! Redirecting…', 'success');
                
                setTimeout(() => {
                    closeModals();
                    setButtonLoading('registerBtn', false);
                    window.location.hash = '#/onboarding';
                }, 1200);

            } catch (err) {
                console.error('Unexpected error during registration:', err);
                showAuthStatus('registerStatus', '❌ Something went wrong. Please try again.', 'error');
                setButtonLoading('registerBtn', false);
            }
        }

        async function handleLogin() {
            const emailOrUsername = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            hideAuthStatus('loginStatus');

            // Validation
            if (!emailOrUsername) {
                showAuthStatus('loginStatus', '⚠️ Please enter your email or username', 'error');
                return;
            }
            if (!password) {
                showAuthStatus('loginStatus', '⚠️ Please enter your password', 'error');
                return;
            }

            if (!sbClient) {
                showAuthStatus('loginStatus', '❌ Connection error — please refresh the page', 'error');
                return;
            }

            setButtonLoading('loginBtn', true);
            showAuthStatus('loginStatus', '⏳ Logging in…', 'info');

            try {
                // If it's not an email, build one from the username
                const authEmail = emailOrUsername.includes('@')
                    ? emailOrUsername
                    : (emailOrUsername.toLowerCase().replace(/[^a-z0-9]/g, '') + '@mindbridge.local');

                const { data, error } = await sbClient.auth.signInWithPassword({
                    email: authEmail,
                    password: password,
                });

                if (error) {
                    console.error('Login error:', error);
                    let msg = error.message;
                    if (msg.includes('Invalid login credentials')) {
                        msg = 'Wrong email/username or password. Please try again.';
                    } else if (msg.includes('Email not confirmed')) {
                        msg = 'Please confirm your email before logging in.';
                    }
                    showAuthStatus('loginStatus', '❌ ' + msg, 'error');
                    setButtonLoading('loginBtn', false);
                    return;
                }

                // Try to load user data from users table
                try {
                    const { data: users } = await sbClient
                        .from('users')
                        .select('*')
                        .order('created_at', { ascending: false })
                        .limit(1);
                    
                    if (users && users.length > 0) {
                        localStorage.setItem('mb_user_id', users[0].id);
                        localStorage.setItem('mb_user', JSON.stringify({
                            name: users[0].name,
                            lang: users[0].language || 'en',
                            goal: users[0].goal || '',
                            therapist: users[0].therapist || '',
                        }));
                    }
                } catch (e) {
                    console.warn('Could not load user profile:', e);
                }

                showAuthStatus('loginStatus', '✅ Welcome back! Redirecting…', 'success');

                setTimeout(() => {
                    closeModals();
                    setButtonLoading('loginBtn', false);
                    window.location.hash = '#/chat';
                }, 1000);

            } catch (err) {
                console.error('Unexpected error during login:', err);
                showAuthStatus('loginStatus', '❌ Something went wrong. Please try again.', 'error');
                setButtonLoading('loginBtn', false);
            }
        }

        // ===== GOOGLE AUTH =====
        async function handleGoogleAuth() {
            if (!sbClient) {
                alert('Connection error — please refresh the page');
                return;
            }

            try {
                const { data, error } = await sbClient.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: window.location.origin + window.location.pathname + '#/chat',
                    }
                });

                if (error) {
                    console.error('Google auth error:', error);
                    alert('Google sign-in is not configured yet. Please use email/password.');
                }
            } catch (err) {
                console.error('Google auth error:', err);
                alert('Google sign-in is not available. Please use email/password.');
            }
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
        function setupAnchorLinks() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    // Check if it's a navigation link (e.g., #/onboarding, #/chat, #/dashboard)
                    if (href.startsWith('#/')) {
                        e.preventDefault();
                        window.location.hash = href;
                        return;
                    }
                    
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }

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
            setupAnchorLinks();

            // Animate goal progress bars
            setTimeout(() => {
                document.querySelectorAll('.goal-progress-bar').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 1000);

            // ===== APP NAVIGATION ROUTING =====
            // React Router handles navigation for #/chat, #/onboarding, #/dashboard
            // No redirect needed - React will handle it via HashRouter

            // Close access panel on outside click
            document.addEventListener('click', (e) => {
                const panel = document.getElementById('accessPanel');
                const toggle = document.querySelector('.accessibility-toggle');
                if (!panel.contains(e.target) && !toggle.contains(e.target)) {
                    panel.classList.remove('show');
                }
            });

            // Set up modal overlay click handlers
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', function(e) {
                    if (e.target === this) closeModals();
                });
            });
        });
