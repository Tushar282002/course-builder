// Main component that ties everything together.
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Module from './Module';
import ResourceUpload from './ResourceUpload';
import ResourceLink from './ResourceLink';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);

  const addModule = () => {
    const newModule = {
      id: uuidv4(),
      name: `Module ${modules.length + 1}`,
      resources: [],
    };
    setModules([...modules, newModule]);
  };

  const renameModule = (index, newName) => {
    const updatedModules = modules.map((mod, idx) =>
      idx === index ? { ...mod, name: newName } : mod
    );
    setModules(updatedModules);
  };

  const deleteModule = (index) => {
    const updatedModules = modules.filter((_, idx) => idx !== index);
    setModules(updatedModules);
  };

  const moveModule = (fromIndex, toIndex) => {
    const updatedModules = [...modules];
    const [movedModule] = updatedModules.splice(fromIndex, 1);
    updatedModules.splice(toIndex, 0, movedModule);
    setModules(updatedModules);
  };

  const addResource = (moduleIndex, resource) => {
    const updatedModules = modules.map((mod, idx) =>
      idx === moduleIndex ? { ...mod, resources: [...mod.resources, resource] } : mod
    );
    setModules(updatedModules);
  };

  const moveResource = (moduleIndex, fromIndex, toIndex) => {
    const updatedModules = [...modules];
    const resources = [...updatedModules[moduleIndex].resources];
    const [movedResource] = resources.splice(fromIndex, 1);
    resources.splice(toIndex, 0, movedResource);
    updatedModules[moduleIndex].resources = resources;
    setModules(updatedModules);
  };

  const deleteResource = (moduleIndex, resource) => {
    const updatedModules = modules.map((mod, idx) =>
      idx === moduleIndex
        ? { ...mod, resources: mod.resources.filter((res) => res.id !== resource.id) }
        : mod
    );
    setModules(updatedModules);
  };

  const editResource = (moduleIndex, resource) => {
    const newName = prompt('Enter new resource name:', resource.name);
    if (newName) {
      const updatedModules = modules.map((mod, idx) =>
        idx === moduleIndex
          ? {
              ...mod,
              resources: mod.resources.map((res) =>
                res.id === resource.id ? { ...res, name: newName } : res
              ),
            }
          : mod
      );
      setModules(updatedModules);
    }
  };

  const handleUpload = (file) => {
    const newResource = {
      id: uuidv4(),
      name: file.name,
      type: 'file',
      file,
    };
    addResource(-1, newResource);
  };

  const handleAddLink = (link) => {
    const newResource = {
      id: uuidv4(),
      name: link,
      type: 'link',
      link,
    };
    addResource(-1, newResource);
  };

  return (
    <div className="course-builder">
      <button onClick={addModule}>Add Module</button>
      <ResourceUpload onUpload={handleUpload} />
      <ResourceLink onAddLink={handleAddLink} />
      {modules.map((module, index) => (
        <Module
          key={module.id}
          module={module}
          index={index}
          moveModule={moveModule}
          onRename={renameModule}
          onDelete={deleteModule}
          onMoveResource={moveResource}
          onAddResource={(resource, action) =>
            action === 'delete'
              ? deleteResource(index, resource)
              : action === 'edit'
              ? editResource(index, resource)
              : addResource(index, resource)
          }
        />
      ))}
    </div>
  );
};

export default CourseBuilder;
