import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Form Pill Selection
  const pillOptions = document.querySelectorAll('.pill-option');
  pillOptions.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = pill.parentElement;
      const hiddenInput = parent.nextElementSibling;
      
      if (hiddenInput && hiddenInput.type === 'hidden') {
        // Remove active from siblings
        parent.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
        // Add active to clicked pill
        pill.classList.add('active');
        // Update hidden input value
        hiddenInput.value = pill.dataset.value;
      }
    });
  });

  // Contact Form Submission (Web3Forms)
  const WEB3FORMS_ACCESS_KEY = 'be37c998-6a51-4dd3-8475-d50330156e96';
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Skickar...';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      const formData = new FormData(contactForm);
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Ny förfrågan från digisoul.se',
        from_name: formData.get('name'),
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        budget: formData.get('budget'),
        message: formData.get('message'),
        botcheck: formData.get('botcheck')
      };

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.success) {
          formStatus.textContent = 'Tack! Din förfrågan är skickad — vi hör av oss inom kort.';
          formStatus.classList.add('success');
          contactForm.reset();
          // Reset pills to first option
          document.querySelectorAll('.form-pills').forEach(group => {
            const pills = group.querySelectorAll('.pill-option');
            pills.forEach(p => p.classList.remove('active'));
            if (pills[0]) {
              pills[0].classList.add('active');
              const hiddenInput = group.nextElementSibling;
              if (hiddenInput && hiddenInput.type === 'hidden') {
                hiddenInput.value = pills[0].dataset.value;
              }
            }
          });
        } else {
          throw new Error(result.message || 'Något gick fel');
        }
      } catch (error) {
        formStatus.textContent = 'Kunde inte skicka förfrågan. Prova igen eller maila oss direkt på info@digisoul.se.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  // Portfolio Project Data
  const projectsData = {
    centrumlack: {
      title: "Centrum Lack",
      category: "Professionell Fordonslackering",
      desc: "För Centrum Lack, en expert inom billackering med över 35 års erfarenhet, byggde vi en modern och snygg hemsida som lyfter fram deras hantverk. Vi fokuserade på att göra det så enkelt som möjligt för kunderna att se deras expertis och boka tid. Idag ser vi till att de syns högt upp på Google och att hemsidan alltid rullar på som den ska.",
      tech: ["Webbutveckling", "SEO", "Branding"],
      images: [
        "/port-centrum-logo.png",
        "/port-centrum-hero.png",
        "/port-centrum-services.png",
        "/port-centrum-contact.png"
      ],
      liveLink: "https://www.centrumlack.se"
    },
    oakdesign: {
      title: "Oak Design Door",
      category: "Premiumsnickeri & Webbnärvaro",
      desc: "Vi hjälpte Oakdesign Door med allt från deras nya logotyp till en skräddarsydd hemsida. Vi skapade en design som känns lika rejäl och exklusiv som deras egna dörrar, och såg till att den fungerar på flera språk. Hemsidan är byggd för att vara enkel att använda för kunderna och vi tar hand om allt det tekniska så att de kan lägga sin tid på hantverket istället.",
      tech: ["Logotypdesign", "Webbutveckling", "UI/UX Design", "Flerspråkig"],
      images: [
        "/port-oak-logo.png",
        "/port-oak-hero.png",
        "/port-oak-products.png",
        "/port-oak-staff.png"
      ],
      liveLink: "https://oakdesign.vercel.app/"
    },
    avtalsvaggen: {
      title: "Avtalsväggen",
      category: "SaaS-plattform för juridik",
      desc: "Vi fick i uppdrag att bygga Avtalsväggen – en modern SaaS-tjänst! Huvudfokus var att utveckla en avancerad AI-plattform som automatiskt tar fram skräddarsydda dokument när användaren fyller i ett formulär. Systemet säkerställer att alla avtal strikt följer Sveriges lagar och juridiska regelverk. Vi ansvarade för hela processen från UX/UI-design till AI-integration och backend-utveckling.",
      tech: ["SaaS", "Systemutveckling", "UX/UI Design", "AI Integration"],
      images: ["/port-avtals.png", "/port-avtals-2.png", "/port-avtals-3.png", "/port-avtals-4.png"]
    }
  };

  // Modal logic
  const modal = document.getElementById('project-modal');
  const modalBackdrop = modal?.querySelector('.modal-backdrop');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTechList = document.getElementById('modal-tech-list');
  const modalGallery = document.getElementById('modal-gallery');
  const modalLiveLink = document.getElementById('modal-live-link');
  const closeBtn = document.getElementById('close-modal');

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.desc;
    modalImg.src = data.images[0];
    modalImg.alt = data.title;
    
    // Live link button
    if (data.liveLink) {
      modalLiveLink.href = data.liveLink;
      modalLiveLink.style.display = 'inline-flex';
    } else {
      modalLiveLink.style.display = 'none';
    }

    // Tech tags
    modalTechList.innerHTML = '';
    data.tech.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      modalTechList.appendChild(span);
    });

    // Gallery / Thumbs
    modalGallery.innerHTML = '';
    if (data.images.length > 1) {
      data.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `${data.title} screenshot ${index + 1}`;
        thumb.className = `modal-thumb ${index === 0 ? 'active' : ''}`;
        thumb.addEventListener('click', () => {
          modalImg.src = img;
          document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
        modalGallery.appendChild(thumb);
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Portfolio card click handlers
  document.querySelectorAll('.case-card[data-project]').forEach(card => {
    const projectId = card.getAttribute('data-project');
    
    // Make the entire card clickable
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking on a link inside the card
      if (e.target.tagName === 'A') return;
      openModal(projectId);
    });
    
    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(projectId);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // Close on backdrop click
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

});
