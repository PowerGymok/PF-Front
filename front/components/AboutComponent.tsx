import { GymLogoComponent } from "./GymLogoComponent";

const AboutComponent = () => {
    return (
        <div>
            <section className="max-w-3xl mx-auto p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-blue-600 font-bold mb-4"><GymLogoComponent /></h1>
                <p className="text-gray-700 text-xl mb-6">
                    En PowerGym creemos que el entrenamiento es mucho más que levantar pesas: es una forma de mejorar tu salud, tu bienestar y tu confianza. Nuestro gimnasio fue creado con el objetivo de ofrecer un espacio moderno, motivador y accesible para todas las personas que quieran llevar un estilo de vida activo.
                </p>
                <p className="text-gray-700 text-xl mb-6">
                    Contamos con equipamiento de alta calidad, amplias áreas de entrenamiento y un equipo de profesionales capacitados que te acompañarán en cada etapa de tu progreso. Ya sea que estés dando tus primeros pasos en el fitness o que busques mejorar tu rendimiento, en PowerGym encontrarás el apoyo y las herramientas necesarias para alcanzar tus objetivos.
                </p>
                <p className="text-gray-700 text-xl mb-6">
                    Ofrecemos distintas actividades y clases adaptadas a todos los niveles, desde entrenamiento funcional y musculación hasta clases grupales diseñadas para mantenerte motivado. Nuestro enfoque está en brindar una experiencia completa donde cada socio pueda entrenar de forma segura, efectiva y con la mejor energía.
                </p>
                <p className="text-gray-700 text-xl mb-6">
                    En PowerGym trabajamos cada día para construir una comunidad fuerte, comprometida y apasionada por el deporte.
                </p>
                <p className="text-gray-700 text-xl mb-6">
                    Tu progreso es nuestra motivación.
                </p>
            </section>
        </div>
    )
}

export default AboutComponent;