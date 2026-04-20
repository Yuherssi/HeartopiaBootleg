function toggleMenu() {
      const dropdown = document.getElementById('mobileDropdown');
      const ham      = document.getElementById('hamburger');
      const isOpen   = dropdown.classList.toggle('open');
      ham.classList.toggle('open');
      ham.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    function closeMenu() {
      document.getElementById('mobileDropdown').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    }

    // Close dropdown when clicking anywhere outside the nav
    document.addEventListener('click', function(e) {
      const nav = document.getElementById('navbar');
      if (!nav.contains(e.target)) closeMenu();
    });