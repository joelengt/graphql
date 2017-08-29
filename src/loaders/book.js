import connector from './../connectors/'
import DataLoader from 'dataloader'

export default () => new DataLoader(ids => {
  return connector('banner')
  .whereIn('id', ids)
  .ordersByRaw('FIELD(banner.id, ?)', [ids])
})
