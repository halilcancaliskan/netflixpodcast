import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold">Bienvenue sur Netflix Podcast</h1>
        <p className="mt-4 text-lg">
          Découvrez une bibliothèque de podcasts audio passionnants.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Vous pouvez remplir cette section avec les aperçus des podcasts, par exemple */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Titre du Podcast</h2>
          <p className="text-gray-600">
            Description concise du podcast. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
            Écouter
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Titre du Podcast</h2>
          <p className="text-gray-600">
            Description concise du podcast. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
            Écouter
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Titre du Podcast</h2>
          <p className="text-gray-600">
            Description concise du podcast. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
            Écouter
          </button>
        </div>

        {/* Ajoutez d'autres aperçus de podcasts selon vos besoins */}
      </section>

      <footer className="mt-16 text-center">
        <p>
          Propulsé par{" "}
          <a
            href="https://audioblog.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Audio Blog
          </a>
        </p>
      </footer>
    </main>
  );
}
