// Component to represent a module.
import React from 'react';
import { useDrop } from 'react-dnd';
import Resource from './Resource';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Module = ({ module, index, moveModule, onRename, onDelete, onMoveResource, onAddResource }) => {
  const [, drop] = useDrop({
    accept: 'RESOURCE',
    hover: () => {},
  });

  const handleRename = () => {
    const newName = prompt('Enter new module name:', module.name);
    if (newName) onRename(index, newName);
  };

  return (
    <div ref={drop} className="module-container">
      <div className="module-header">
        <h3>{module.name}</h3>
        <div>
          <button onClick={handleRename}> <FaEdit /> Rename</button>
          <button onClick={() => onDelete(index)}> <FaTrash /> Delete</button>
        </div>
      </div>
      {module.resources.map((resource, idx) => (
        <Resource
          key={resource.id}
          resource={resource}
          index={idx}
          moveResource={(dragIndex, hoverIndex) => onMoveResource(index, dragIndex, hoverIndex)}
          onDelete={(resource) => onAddResource(index, resource, 'delete')}
          onEdit={(resource) => onAddResource(index, resource, 'edit')}
        />
      ))}
    </div>
  );
};

export default Module;
