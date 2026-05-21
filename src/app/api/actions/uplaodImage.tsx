export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data.url as string;
};