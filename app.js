// Register GSAP Flip Plugin
gsap.registerPlugin(Flip);

document.addEventListener("DOMContentLoaded", () => {
    const folders = document.querySelectorAll('.folder');
    const closeButtons = document.querySelectorAll('.close-btn');
    let isAnimating = false;
    let activeFolder = null;

    // Entrance Animation
    gsap.from(".folder", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from(".masthead", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Handle Opening a Folder
    function openFolder(folder) {
        if (isAnimating || activeFolder === folder) return;
        isAnimating = true;

        // Capture initial state for FLIP
        const state = Flip.getState(folders);

        // Manage classes
        activeFolder = folder;
        folder.classList.add('folder--active');
        folder.setAttribute('aria-expanded', 'true');
        document.body.classList.add('folder-open');

        // Hide other folders
        folders.forEach(f => {
            if (f !== folder) {
                f.classList.add('folder--hidden');
            }
        });

        // Animate using FLIP
        Flip.from(state, {
            duration: 0.8,
            ease: "power3.inOut",
            absolute: true,
            onComplete: () => {
                // Animate interior content after FLIP completes
                const content = folder.querySelector('.content-interior');
                const closeBtn = folder.querySelector('.close-btn');
                
                gsap.to([content, closeBtn], {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    onComplete: () => {
                        isAnimating = false;
                        closeBtn.focus(); // Accessibility: move focus to close button
                    }
                });
            }
        });

        // Animate out hidden folders
        gsap.to(".folder--hidden", {
            y: "100vh",
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut"
        });
    }

    // Handle Closing a Folder
    function closeFolder() {
        if (isAnimating || !activeFolder) return;
        isAnimating = true;

        const folderToClose = activeFolder;
        const content = folderToClose.querySelector('.content-interior');
        const closeBtn = folderToClose.querySelector('.close-btn');

        // Fade out interior content first
        gsap.to([closeBtn, content], {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                // Capture state for FLIP
                const state = Flip.getState(folders);

                // Reset classes
                folderToClose.classList.remove('folder--active');
                folderToClose.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('folder-open');
                
                folders.forEach(f => {
                    f.classList.remove('folder--hidden');
                });

                // Reset positions of previously hidden folders for FLIP
                gsap.set(".folder", { clearProps: "y,opacity" });

                // Animate using FLIP
                Flip.from(state, {
                    duration: 0.8,
                    ease: "power3.inOut",
                    absolute: true,
                    onComplete: () => {
                        activeFolder = null;
                        isAnimating = false;
                        folderToClose.querySelector('.folder-tab').focus(); // Return focus to tab
                    }
                });
            }
        });
    }

    // Event Listeners
    folders.forEach(folder => {
        const tab = folder.querySelector('.folder-tab');
        
        tab.addEventListener('click', () => {
            openFolder(folder);
        });

        // Keyboard support for tabs (Enter/Space)
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFolder(folder);
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeFolder();
        });
    });

    // Global Escape Key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeFolder && !isAnimating) {
            closeFolder();
        }
    });
});
