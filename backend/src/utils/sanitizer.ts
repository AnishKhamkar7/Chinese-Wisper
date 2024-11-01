import sanitizeHtml from 'sanitize-html';

export default function sanitizeRequest<T>(input: T): T {
  if (typeof input === 'string') {
    return sanitizeHtml(input) as T;
    
  }

  if (Array.isArray(input)) {
    return input.map((element) => sanitizeRequest(element)) as T;

   
  }

  if (typeof input === 'object' && input !== null) {
    const sanitizedObject: { [key: string]: unknown } = {};
    Object.entries(input).forEach(([key, value]) => {
      sanitizedObject[key] = sanitizeRequest(value);
    });
    return sanitizedObject as T;
  }

  return input;
}
