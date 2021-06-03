import { Request, Response} from 'express'
import { getRepository } from 'typeorm';
import Link from '@models/CreateLink'
import viewLink from '@views/viewLink';

function generateCode (length: number) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('')
}

class LinkController {
  async index (req: Request, res: Response) {
    const { id } = req.params
    const repository = getRepository(Link)
    const link = await repository.findOne({ where: { code: id }})
    if(!link) {
      return res.status(404).send({ error: 'Link não encontrado' })
    }
    link.hits++
    await repository.save(link)

    res.redirect(viewLink.render(link).url)
  }

  async status (req: Request, res: Response) {
    const { id } = req.params
    const repository = getRepository(Link)
    const link = await repository.findOne({ where: { code: id }})
    if(!link) {
      return res.status(404).send({ error: 'Link não encontrado' })
    }
  }

  async store (req: Request, res: Response) {
    const { url } = req.body
    const code = generateCode(5)
    const repository = getRepository(Link)

    const existLink = await repository.findOne({ where: { code }})

    if(existLink) {
      return res.status(409).send({ error: 'Já existe um link com esse código' })
    }

    const link = repository.create({
      url,
      code,
    })

    await repository.save(link)

    res.status(200).send(viewLink.render(link))
  }
}


export default new LinkController
