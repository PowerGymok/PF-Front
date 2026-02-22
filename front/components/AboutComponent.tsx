import { GymLogoComponent } from "./GymLogoComponent";

const AboutComponent = () => {
    return (
        <div>
            <section className="max-w-3xl mx-auto p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-blue-600 font-bold mb-4"><GymLogoComponent /></h1>
                <p className="text-gray-700 text-xl mb-6">
                    We are a team of passionate developers dedicated to creating amazing web applications. Our mission is to provide high-quality software solutions that meet the needs of our clients and users.
                </p>
                <p className="text-gray-700 text-xl mb-6">
                    With years of experience in the industry, we have worked on a wide range of projects, from small startups to large enterprises. We believe in continuous learning and improvement, and we are always looking for new challenges to tackle.
                </p>
                <p className="text-gray-700 text-xl mb-6">
                    If you want to learn more about our team or have any questions, feel free to reach out to us. We are always happy to connect with like-minded individuals and collaborate on exciting projects.
                </p>
            </section>
        </div>
    )
}

export default AboutComponent;