
   const paths = document.querySelectorAll('path');
   const svgElement = document.getElementById('miSVG'); 


// Definir las variables para la animación de onda
const waveAmplitude = 5; // Amplitud de la onda
const waveFrequency = 1; // Frecuencia de la onda
const rotationDuration = 1; // Duración de cada rotación
const pauseDuration = 5; // Duración de la pausa
const bubbleMovementDuration = 2; // Duración total del movimiento de burbuja



// Establecer el punto de origen de la transformación al centro
gsap.set(paths, {
  transformOrigin: "50% 50%"
});

// Crear un timeline para la animación de rotación
const rotationTimeline = gsap.timeline({ repeat: -1 }); // Repite indefinidamente

// Definir los ángulos de rotación
const rotationAngles = [45, 135, 270, 315, 360, -0]; // Modificado para incluir 90, 180 y 270

// Añadir las rotaciones y pausas al timeline
rotationAngles.forEach(angle => {
  rotationTimeline.to(paths, {
    duration: rotationDuration,
    rotationZ: angle, // Rotación en el eje Z
    ease: "power2.inOut",
    stagger: 0.2 // Para que cada path se anime con un pequeño desfase
  }).to(paths, {
    duration: pauseDuration,
    ease: "none" // Pausa sin efecto
  });
});

   // Animar el texto
   gsap.to("#conciergeText", {
            duration: 3, // Duración de la animación
            opacity: 1,  // Hacerlo visible
            y: -10,      // Moverlo hacia arriba
            ease: "power2.out" // Suavizar la animación
        });





/* Scrip para las preguntas de género */

document.addEventListener('DOMContentLoaded', () => {
  const storyTypeSelector = document.getElementById('storyTypeSelector');
  const contentSections = document.querySelectorAll('.content');
  const optionContainers = document.querySelectorAll('.story-options');
  const generosDiv = document.querySelector('.generos'); 

  // Asigna el evento de cambio al select fuera del bucle
  storyTypeSelector.addEventListener('change', () => {
    const selectedType = storyTypeSelector.value;

     // Remueve la clase d-none del div "generos" al seleccionar una opción
     if (generosDiv.classList.contains('d-none')) {
      generosDiv.classList.remove('d-none');
    }

    // Limpia el valor del input en cada sección
    contentSections.forEach(section => {
      const input = section.querySelector('ul input');
      input.value = ''; // Limpia el input
    });

    // Oculta todos los contenedores de opciones
    optionContainers.forEach(container => {
      container.style.display = 'none';
    });

    // Muestra solo el contenedor correspondiente a la opción seleccionada
    const selectedContainer = document.getElementById(selectedType);
    if (selectedContainer) {
      selectedContainer.style.display = 'block';
    }
  });

  // Agrega el evento a cada opción en cada sección
  contentSections.forEach(section => {
    const input = section.querySelector('ul input');
    const optionTags = section.querySelectorAll('.option-tag');

    optionTags.forEach(option => {
      option.addEventListener('click', () => {
        // Asigna el texto del tag seleccionado al input
        input.value = option.textContent.trim();

         // Remueve la clase 'selected' de todos los tags
         optionTags.forEach(tag => {
          tag.classList.remove('selected');
        });

         // Agrega la clase 'selected' al tag clickeado
         option.classList.add('selected');

      });
    });
  });
});






/* Drag and Drop */
document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los contenedores .options-container
  const optionsContainers = document.querySelectorAll('.options-container');

  optionsContainers.forEach(optionsContainer => {
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Evento de mousedown para comenzar el arrastre
    optionsContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      optionsContainer.classList.add('dragging');
      startX = e.pageX - optionsContainer.offsetLeft;
      scrollLeft = optionsContainer.scrollLeft;
    });

    // Evento de mouseleave para detener el arrastre al salir del contenedor
    optionsContainer.addEventListener('mouseleave', () => {
      isDragging = false;
      optionsContainer.classList.remove('dragging');
    });

    // Evento de mouseup para detener el arrastre al soltar el botón
    optionsContainer.addEventListener('mouseup', () => {
      isDragging = false;
      optionsContainer.classList.remove('dragging');
    });

    // Evento de mousemove para desplazar el contenido mientras se arrastra
    optionsContainer.addEventListener('mousemove', (e) => {
      if (!isDragging) return;  // Solo mueve si está arrastrando
      e.preventDefault();
      const x = e.pageX - optionsContainer.offsetLeft;
      const walk = (x - startX) * 2;  // Ajusta la velocidad del desplazamiento
      optionsContainer.scrollLeft = scrollLeft - walk;
    });
  });
});


