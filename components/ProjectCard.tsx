import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-stone-900 shadow-md hover:shadow-2xl hover:shadow-forest-900/10 dark:hover:shadow-forest-900/20 transition-all duration-500 ease-out hover:-translate-y-2 border border-earth-200 dark:border-stone-800 hover:border-forest-300 dark:hover:border-forest-700">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 via-forest-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
           <p className="text-forest-200 text-sm font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
             {project.category}
           </p>
           <h3 className="text-white text-xl font-bold font-serif transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
             {project.title}
           </h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-300 border border-forest-100 dark:border-forest-800/50 transition-colors duration-300 group-hover:bg-forest-100 dark:group-hover:bg-forest-900/50">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-earth-800 dark:text-stone-300 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
      
      {/* Indicador de ação sutil no rodapé do card */}
      <div className="h-1 w-0 bg-forest-500 absolute bottom-0 left-0 transition-all duration-500 group-hover:w-full opacity-80"></div>
    </div>
  );
};

export default ProjectCard;