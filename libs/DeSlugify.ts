function DeSlugify(text: any): string {
  return text.replace(/-/g, " ");
}

export default DeSlugify;
