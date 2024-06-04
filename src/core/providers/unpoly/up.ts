import { HttpContext } from '@adonisjs/core/http'

/**
 * A list of supported unpoly headers
 */
const UNPOLY_HEADERS = [
  'Last-Modified',
  'X-Up-Accept-Layer',
  'X-Up-Context',
  'X-Up-Dismiss-Layer',
  'X-Up-Events',
  'X-Up-Expire-Cache',
  'X-Up-Fail-Context',
  'X-Up-Fail-Mode',
  'X-Up-Fail-Target',
  'X-Up-Location',
  'X-Up-Method',
  'X-Up-Mode',
  'X-Up-Target',
  'X-Full-Reload',
]

export default class Up {
  constructor(private ctx: HttpContext) {}

  /**
   * The headers to set on the response
   */
  private headers: Record<string, string> = {}

  /**
   * Returns the value of an unpoly header.
   */
  private getProperty(header: string): string | undefined {
    return this.ctx.request.header(header)
  }

  /**
   * Set the unpoly response header
   */
  private setProperty(header: string, value: string): Up {
    this.headers[header] = value
    return this
  }

  /**
   * Set unpoly headers as response headers
   */
  private setHeadersAsResponse(headers: Record<string, string>) {
    Object.keys(headers).forEach((header) => {
      this.ctx.response.header(header, headers[header])
    })
  }

  /**
   * Commit response
   */
  commit() {
    this.setHeadersAsResponse(this.headers)
  }

  getLayer() {
    return this.getProperty('X-Up-Accept-Layer')
  }

  getCache() {
    return this.getProperty('X-Up-Expire-Cache')
  }

  getContext() {
    return this.getProperty('X-Up-Context')
  }

  getDismissLayer() {
    return this.getProperty('X-Up-Dismiss-Layer')
  }

  getEvents() {
    return this.getProperty('X-Up-Events')
  }

  getFailContext() {
    return this.getProperty('X-Up-Fail-Context')
  }

  getFailMode() {
    return this.getProperty('X-Up-Fail-Mode')
  }

  getFailTarget() {
    return this.getProperty('X-Up-Fail-Target')
  }

  getLocation() {
    return this.getProperty('X-Up-Location')
  }

  getMethod() {
    return this.getProperty('X-Up-Method')
  }

  getMode() {
    return this.getProperty('X-Up-Mode')
  }

  getReloadFromTime() {
    return this.getProperty('Last-Modified')
  }

  getTarget() {
    return this.getProperty('X-Up-Target') || 'body'
  }

  targetIncludes(selector: string): boolean {
    const target = this.getTarget()
      .split(',')
      .map((value) => value.trim())
    return target.includes('body') ? true : target.includes(selector)
  }

  getTitle() {
    return this.getProperty('X-Up-Title')
  }

  getValidate() {
    return this.getProperty('X-Up-Validate')
  }

  getVersion() {
    return this.getProperty('X-Up-Version')
  }

  setLayer(value: string) {
    return this.setProperty('X-Up-Accept-Layer', value)
  }

  setCache(value: string) {
    return this.setProperty('X-Up-Expire-Cache', value)
  }

  setContext(value: string) {
    return this.setProperty('X-Up-Context', value)
  }

  setDismissLayer(value: string = 'null') {
    return this.setProperty('X-Up-Dismiss-Layer', value)
  }

  setEvents(value: string) {
    return this.setProperty('X-Up-Events', value)
  }

  setFailContext(value: string) {
    return this.setProperty('X-Up-Fail-Context', value)
  }

  setFailMode(value: string) {
    return this.setProperty('X-Up-Fail-Mode', value)
  }

  setFailTarget(value: string) {
    return this.setProperty('X-Up-Fail-Target', value)
  }

  setLocation(value: string) {
    return this.setProperty('X-Up-Location', value)
  }

  setMethod(value: string) {
    return this.setProperty('X-Up-Method', value)
  }

  setMode(value: string) {
    return this.setProperty('X-Up-Mode', value)
  }

  setReloadFromTime(value: string) {
    return this.setProperty('Last-Modified', value)
  }

  setTarget(value: string) {
    return this.setProperty('X-Up-Target', value)
  }

  setTitle(value: string) {
    return this.setProperty('X-Up-Title', value)
  }

  setValidate(value: string) {
    return this.setProperty('X-Up-Validate', value)
  }

  setVersion(value: string) {
    return this.setProperty('X-Up-Version', value)
  }

  fullReload() {
    return this.setProperty('X-Full-Reload', 'true')
  }

  isDrawer() {
    return this.getMode() === 'drawer'
  }

  isRoot() {
    return this.getMode() === 'root'
  }

  isModal() {
    return this.getMode() === 'modal'
  }

  isPopup() {
    return this.getMode() === 'popup'
  }

  isCover() {
    return this.getMode() === 'cover'
  }
}
