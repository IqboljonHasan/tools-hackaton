// components/ToolForm.js
import { useState } from 'react';
import axios from 'axios';
import StripeButton from './StripeButton';

export default function ToolForm() {
  const [formData, setFormData] = useState({ url: '', email: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/tools', formData);
      window.location.href = response.data.stripeUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tool URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
