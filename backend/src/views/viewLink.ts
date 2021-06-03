import Link from "@models/CreateLink";

export default {
  render (link: Link) {
    return {
      id: link.id,
      short: `${process.env.BASE_URL}/${link.code}`,
      url: link.url,
      code: link.code,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt
    }
  }
}
