import { expect } from "@playwright/test";

export class UiValid {
  constructor(page) {
    this.page = page;
    this.header = page.locator("#stats");
    this.graph = page.locator("#genderChart");
  }

  async validateUi() {
    await expect(this.header).toHaveText(
      /Total Civils: [1-9]\d*, Males: [1-9]\d*, Females: [1-9]\d*/,
    );
  }

  async validateGraph() {
    await expect(this.graph).toBeVisible();

    const boundingBox = await this.graph.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox.width).toBeGreaterThan(0);
    expect(boundingBox.height).toBeGreaterThan(0);

    await expect(this.graph).toHaveScreenshot("gender-chart-drawing.png", {
      threshold: 1,
      animations: "disabled",
    });
  }
}
