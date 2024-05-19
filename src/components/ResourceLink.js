// Component for adding a link as a resource.
import React, { useState } from 'react';

const ResourceLink = ({ onAddLink }) => {
  const [link, setLink] = useState('');

  const handleAddLink = () => {
    if (link) {
      onAddLink(link);
      setLink('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Add link"
      />
      <button onClick={handleAddLink}>Add Link</button>
    </div>
  );
};

export default ResourceLink;
