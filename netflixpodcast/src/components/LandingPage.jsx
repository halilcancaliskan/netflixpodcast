import React from "react";

const LandingPage = () => {
    return (
        <div className="relative px-4 md:px-0">
            <div className="absolute inset-0 bg-neutral-800 backdrop-blur-2xl"></div>
            <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative z-10">
                <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold mb-6">Bienvenue sur Trailer Vision</h1>

                        <p className="text-lg mb-4">
                            Votre destination ultime pour le divertissement responsable
                        </p>
                        <p className="text-lg mb-4">
                            🎥 Explorez et Découvrez 🎥
                        </p>

                        <ul className="list-disc ml-8">
                            <li>Naviguez à travers notre vaste bibliothèque de films et découvrez des œuvres captivantes tout en contribuant à la protection de notre planète.</li>
                        </ul>

                        <p className="text-lg mb-4">
                            🌐 Accès Rapide et Recherche 🌐
                        </p>

                        <ul className="list-disc ml-8">
                            <li>Notre interface conviviale vous permet de trouver rapidement vos films préférés. Utilisez la barre de recherche pour accéder instantanément à vos titres favoris.</li>
                        </ul>

                        <p className="text-lg mb-4">
                            🚀 Une Expérience de Divertissement Exceptionnelle 🚀
                        </p>

                        <p className="text-lg mt-6">
                            En choisissant Trailer Vision, vous faites le choix d un divertissement de qualité, tout en prenant part à un mouvement pour un avenir plus durable. Rejoignez-nous dans cette aventure vers un divertissement responsable !
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold mb-6">Notre Engagement Green IT</h1>

                        <p className="text-lg mb-4">
                            Chez Trailer Vision, nous sommes déterminés à minimiser notre impact sur l environnement
                            et à encourager des habitudes de navigation plus durables. Voici quelques raisons
                            pour lesquelles vous devriez choisir Trailer Vision comme votre site de divertissement
                            préféré :
                        </p>

                        <ul className="list-disc ml-8">
                            <li>Utilisation d un hébergement écoénergétique et de serveurs basse consommation.</li>
                            <li>Optimisation du code pour une charge rapide et une utilisation efficace des ressources.</li>
                            <li>Encouragement à la réduction des impressions et à la promotion du numérique.</li>
                            <li>Partenariats avec des fournisseurs d énergie renouvelable.</li>
                        </ul>

                        <p className="text-lg mt-6">
                            En choisissant Trailer Vision, vous contribuez à la protection de notre planète tout en
                            profitant d une expérience de divertissement exceptionnelle. Ensemble, faisons un choix
                            responsable pour un avenir durable.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
