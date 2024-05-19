// Component to represent a resource 
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Resource = ({ resource, index, moveResource, onDelete, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'RESOURCE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveResource(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }} className="resource-item">
      <div>{resource.name}</div>
      <button onClick={() => onEdit(resource)}> <FaEdit /> </button>
      <button onClick={() => onDelete(resource)}> <FaTrash /> </button>
    </div>
  );
};

export default Resource;
