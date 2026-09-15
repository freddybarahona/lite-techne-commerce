import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly currentYear = new Date().getFullYear();
  protected industryVisible = false;
  protected informationVisible = false;
  protected socialVisible = false;
  protected messageVisible = false;

  protected toggle(section: 'industry' | 'information' | 'social'): void {
    if (section === 'industry') this.industryVisible = !this.industryVisible;
    if (section === 'information') this.informationVisible = !this.informationVisible;
    if (section === 'social') this.socialVisible = !this.socialVisible;
  }
}
