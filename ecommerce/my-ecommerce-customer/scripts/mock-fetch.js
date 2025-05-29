global.fetch = async () => ({ ok: true, json: async () => ({ items: [] }), text: async () => "" });
